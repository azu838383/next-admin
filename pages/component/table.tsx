import { useLoading } from "@/components/Loading";
import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import TabelComp from "@/components/tableComp";
import { CreateProduct, GetProduct, IProductPost } from "@/libs/api/product";
import {
	Button,
	Code,
	Modal,
	NumberFormatter,
	Select,
	Switch,
	Text,
	TextInput,
	Textarea,
} from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useLocalStorage } from "@mantine/hooks";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import appConfig from "../../app.json";
import LoaderComponent from "@/components/loader/LoaderComponent";

export default function TablePage() {
	const {
		addNotification,
		handleError,
		showLoadingSpinner,
		hideLoadingSpinner,
	}: any = useLoading();
	const [checkedDownload, setCheckedDownload] = useLocalStorage({
		key: "togle-download",
		defaultValue: false,
	});
	const [checkedSearch, setCheckedSearch] = useLocalStorage({
		key: "togle-search",
		defaultValue: false,
	});
	const [checkedPagination, setCheckedPagination] = useLocalStorage({
		key: "togle-pagination",
		defaultValue: false,
	});
	const [checkedCentered, setCheckedCentered] = useLocalStorage({
		key: "togle-centered",
		defaultValue: false,
	});

	const initialStateForm: IProductPost = {
		product_name: "",
		product_cat: "",
		product_desc: "",
		product_img: [],
	};

	const [buttonLabel, setButtonLabel] = useState<string | undefined>(
		undefined
	);
	const [files, setFiles] = useState<FileWithPath[]>([]);
	const [formData, setFormData] = useState<IProductPost>(initialStateForm);
	const { dataProduct, isLoadingProduct, isErrorProduct, mutateProduct } = GetProduct(true)

	const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return (
			<Image
				alt="preview"
				width={150}
				height={150}
				className="h-full w-full object-cover"
				key={index}
				src={imageUrl}
				onLoad={() => URL.revokeObjectURL(imageUrl)}
			/>
		);
	});

	const [modalVisible, setModalVisible] = useState(false);

	const columns = useMemo(() => {
		return [
			{
				Header: "ID",
				accessor: "id",
			},
			{
				Header: "Product",
				accessor: "title",

			},
			{
				Header: "Price",
				accessor: "price",
				Cell: ({ value }: { value: number }) => (
					<NumberFormatter
						prefix="$"
						value={value}
						thousandSeparator="."
						decimalSeparator=","
					/>
				),
			},
			{
				Header: "Image",
				accessor: "images",
				Cell: ({ value }: { value: string[] }) => (
					<div className="flex items-center justify-center">
						<Image
							alt="product"
							src={value[0]}
							height={40}
							width={40}
							className="h-[40px] object-cover"
						/>
					</div>
				),
			},
			{
				Header: "Action",
				accessor: "_",
				Cell: ({ row }: { row: any }) => (
					<Button
						onClick={() => {
							setModalVisible(true);
						}}
					>
						Set State
					</Button>
				),
			},
		];
	}, []);

	const handleExportGlobal = async (): Promise<any> => {
		const data = dataProduct?.products;
		// Create a new workbook
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("ReportToExcell");

		// Define the header style
		const headerStyle = {
			font: { bold: true },
			fill: {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "00FF00" },
			} as ExcelJS.FillPattern, // Red fill color
			border: {
				top: { style: "thin" as ExcelJS.BorderStyle },
				left: { style: "thin" as ExcelJS.BorderStyle },
				bottom: { style: "thin" as ExcelJS.BorderStyle },
				right: { style: "thin" as ExcelJS.BorderStyle },
			},
			alignment: { horizontal: "center" as any }, // Center align the text
		};

		// Define the cell style
		const cellStyle = {
			border: {
				top: { style: "thin" as ExcelJS.BorderStyle },
				left: { style: "thin" as ExcelJS.BorderStyle },
				bottom: { style: "thin" as ExcelJS.BorderStyle },
				right: { style: "thin" as ExcelJS.BorderStyle },
			},
		};

		// Set the header row and apply the header style
		const headerRow = worksheet.getRow(1);
		headerRow.values = columns
			.filter((f) => f.accessor !== "_")
			.map((e) => e.Header);
		headerRow.eachCell((cell) => {
			cell.fill = headerStyle.fill;
			cell.font = headerStyle.font;
			cell.border = headerStyle.border;
		});

		// Populate the data rows and apply the cell style
		data?.forEach((row, index) => {
			const dataRow = worksheet.getRow(index + 2);
			dataRow.values = [row.id, row.title, row.price, row.images[0]];
			dataRow.eachCell((cell) => {
				cell.border = cellStyle.border;
			});
		});

		// Auto-fit columns
		worksheet.columns.forEach((column) => {
			column.width = 15;
		});

		// Generate the Excel file
		const excelBuffer = await workbook.xlsx.writeBuffer();

		// Create a Blob and save the file
		const dataBlob = new Blob([excelBuffer], {
			type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		});

		saveAs(dataBlob, "ReportToExcell.xlsx");
	};

	const [stateError, setStateError] = useState<Record<string, string>>({})

	const validation = (): boolean => {
		let error: Record<string, string> = {}
		if (formData.product_name.length < 6) {
			error.product_name = "Product name must be more than 6 Character"
		}
		if (formData.product_cat.toLowerCase() === "") {
			error.product_cat = "Product category must be choosen"
		}
		if (formData.product_desc.length < 6) {
			error.product_desc = "Product description must be more than 6 characters"
		}
		if (formData.product_img.length === 0) {
			error.product_img = "Please upload product image"
		}
		setStateError(error)
		return (
			formData.product_name.length >= 6 &&
			formData.product_cat.toLowerCase() !== "" &&
			formData.product_desc.length >= 6 &&
			formData.product_img.length !== 0
		)
	}

	const handleSubmit = async (): Promise<any> => {
		try {
			showLoadingSpinner();
			if (validation()) {
				await CreateProduct(formData);
				addNotification({
					position: "top-right",
					message: "Form Data ready to submit",
					type: "success",
				});
				setModalVisible(false);
				handleReset();
			}
		} catch (error) {
			handleError(error);
		} finally {
			hideLoadingSpinner();
		}
	};

	const handleReset = (): void => {
		setFormData(initialStateForm);
		setFiles([]);
	};

	return (
		<>
			<Head>
				<title>Table | {appConfig.name}</title>
			</Head>
			<Layout>
				<div className="grid grid-cols-2 gap-4">
					<CardLayout>
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-2 gap-4">
								<Switch
									checked={checkedPagination}
									onChange={(event) => {
										setCheckedPagination(
											event.currentTarget.checked
										);
									}}
									size="md"
									onLabel="ON"
									offLabel="OFF"
									label="Enable Pagination"
								/>
								<Switch
									checked={checkedSearch}
									onChange={(event) => {
										setCheckedSearch(
											event.currentTarget.checked
										);
									}}
									size="md"
									onLabel="ON"
									offLabel="OFF"
									label="Enable Search Function"
								/>
								<Switch
									checked={checkedDownload}
									onChange={(event) => {
										setCheckedDownload(
											event.currentTarget.checked
										);
									}}
									size="md"
									onLabel="ON"
									offLabel="OFF"
									label="Enable Export to Excell"
								/>
								<Switch
									checked={checkedCentered}
									onChange={(event) => {
										setCheckedCentered(
											event.currentTarget.checked
										);
									}}
									size="md"
									onLabel="ON"
									offLabel="OFF"
									label="Enable Column Center"
								/>
							</div>

							{checkedDownload && (
								<div className="w-fit">
									<TextInput
										label={"Label Button Export Excell"}
										value={buttonLabel}
										placeholder="Input button export label"
										onChange={(e) => {
											if (e.target.value === "") {
												setButtonLabel(undefined);
											} else {
												setButtonLabel(e.target.value);
											}
										}}
									/>
								</div>
							)}

							<Code block>
								{`
    <TabelComp
      columns={columns}
      data={dataDummy}
      loading={false}
      withPagination={${checkedPagination ? "true" : "false"}}
      withSearch={${checkedSearch ? "true" : "false"}}
      withDownload={${checkedDownload ? "true" : "false"}}
      centered={${checkedCentered ? "true" : "false"}}
      downloadBtnLabel={'${buttonLabel ?? "Export to Excell"}'}
      onDownload={()=>{
          handleExportGlobal()
      }}
    />
  `}
							</Code>
						</div>
					</CardLayout>
					<CardLayout>
						<div className="flex flex-col h-full">
							<LoaderComponent
								compLoading={isLoadingProduct}
								compError={isErrorProduct}
								compEmpty={Number(dataProduct?.products.length ?? 0) < 1}
								mutateData={mutateProduct}
								emptyText="No Data Available"
								errorText="Sorry... We Couldn't get the data for now.."
								loadingText="Please Wait... Getting the data from server..."
							>
								<TabelComp
									columns={columns}
									data={dataProduct?.products ?? []}
									loading={false}
									centered={checkedCentered}
									withPagination={checkedPagination}
									withSearch={checkedSearch}
									withDownload={checkedDownload}
									downloadBtnLabel={buttonLabel}
									onDownload={() => {
										handleExportGlobal();
									}}
								/>
							</LoaderComponent>
						</div>
					</CardLayout>
				</div>
			</Layout>
			<Modal
				opened={modalVisible}
				onClose={() => {
					setModalVisible(false);
				}}
				title="Create Product"
				size={"md"}
			>
				<div className="flex flex-col gap-2">
					<div className="flex gap-4">
						<div className="flex flex-col gap-2 w-full">
							<TextInput
								label="Product Name"
								error={stateError.product_name}
								placeholder="Name of product"
								withAsterisk
								value={formData?.product_name}
								onChange={(e) => {
									setFormData({
										...formData,
										product_name: e.target.value,
									});
								}}
							/>
							<Select
								label="Product Category"
								placeholder="Choose Product Category"
								checkIconPosition="right"
								error={stateError.product_cat}
								withAsterisk
								value={formData.product_cat}
								onChange={(e) => {
									setFormData({
										...formData,
										product_cat: String(e),
									});
								}}
								data={[
									{
										label: "Electronic",
										value: "electronic",
									},
									{
										label: "Fashion",
										value: "fashion",
									},
									{
										label: "Toys",
										value: "toys",
									},
									{
										label: "Other",
										value: "other",
									},
								]}
							/>
						</div>
						<div className="flex flex-col w-fit justify-between items-stretch">
							<div className="">
								<Text size="sm" className="mb-1 leading-3">
									Product Image <span className="text-red-500">*</span>
								</Text>
								<Dropzone
									className={`border mt-1 ${stateError.product_img ? "border-red-500" : "border-white border-opacity-20"}`}
									accept={IMAGE_MIME_TYPE}
									onDrop={(e) => {
										setFiles(e);
										setFormData({
											...formData,
											product_img: e,
										});
									}}
								>
									<div className="relative w-[105px] h-[105px] object-cover">
										{previews.length < 1 ? (
											<Text
												size="sm"
												className={`absolute w-full h-full flex items-center justify-center cursor-pointer transition-all ${stateError.product_img ? "!text-red-500" : ""}`}
											>
												Drop here
											</Text>
										) : (
											<Text
												size="sm"
												className={`absolute w-full h-full flex items-center justify-center cursor-pointer transition-all hover:bg-black hover:bg-opacity-50 opacity-0 hover:opacity-100`}
											>
												Click here
											</Text>
										)}
										{previews}
									</div>
								</Dropzone>
							</div>
							{stateError.product_img && (
								<Text size="xs" className="!text-red-500 text-center">{stateError.product_img}</Text>
							)}
						</div>
					</div>
					<Textarea
						label="Product Description"
						placeholder="Describe Your Product"
						error={stateError.product_desc}
						withAsterisk
						autosize
						minRows={2}
						maxRows={4}
						value={formData?.product_desc}
						onChange={(e) => {
							setFormData({
								...formData,
								product_desc: e.target.value,
							});
						}}
					/>
					<div className="flex gap-2 justify-center mt-2">
						<Button
							onClick={() => {
								handleSubmit();
							}}
						>
							Submit
						</Button>
						<Button
							variant="outline"
							onClick={() => {
								setModalVisible(false);
								handleReset();
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
}
