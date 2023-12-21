import React, { useMemo, useState } from 'react'
import Layout from '@/components/layout'
import { Button, Code, Modal, NumberFormatter, Select, Switch, Text, TextInput, Textarea } from '@mantine/core'
import TabelComp from '@/components/tableComp'
import Head from 'next/head'
import appConfig from '../../app.json'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import CardLayout from '@/components/layout/CardLayout'
import { useLocalStorage } from '@mantine/hooks'
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Image from 'next/image'
import { useLoading } from '@/components/Loading'

export default function TablePage() {

    const { addNotification, handleError, showLoadingSpinner, hideLoadingSpinner }: any = useLoading()
    const [checkedDownload, setCheckedDownload] = useLocalStorage({
		key: 'togle-download',
		defaultValue: false,
    });
    const [checkedSearch, setCheckedSearch] = useLocalStorage({
		key: 'togle-search',
		defaultValue: false,
    });
    const [checkedPagination, setCheckedPagination] = useLocalStorage({
		key: 'togle-pagination',
		defaultValue: false,
    });
    const [checkedCentered, setCheckedCentered] = useLocalStorage({
		key: 'togle-centered',
		defaultValue: false,
    });

	interface IProductPost {
		product_name: string
		product_cat: string
		product_desc: string 
		product_img: FileWithPath[] | []
	}

	const initialStateForm: IProductPost = {
		product_name: '',
		product_cat: '',
		product_desc: '',
		product_img: [],
	}

    const [buttonLabel, setButtonLabel] = useState<string|undefined>(undefined)
    const [files, setFiles] = useState<FileWithPath[]>([])
	const [formData, setFormData] = useState<IProductPost>(initialStateForm)

    const previews = files.map((file, index) => {
		const imageUrl = URL.createObjectURL(file);
		return <Image alt='preview' width={150} height={150} className='h-full w-full object-cover' key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    })

    const [modalVisible, setModalVisible] = useState(false)

    const dataDummy = useMemo(() => [
        { position: 1, mass: 12011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14007, symbol: 'N', name: 'Nitrogen' },
        { position: 24, mass: 88906, symbol: 'Y', name: 'Yttrium' },
        { position: 32, mass: 13733, symbol: 'Ba', name: 'Barium' },
        { position: 9, mass: 120011, symbol: 'C', name: 'Carbon' },
        { position: 3, mass: 140007, symbol: 'N', name: 'Nitrogen' },
        { position: 13, mass: 88906, symbol: 'Y', name: 'Yttrium' },
        { position: 4, mass: 137133, symbol: 'Ba', name: 'Barium' },
        { position: 5, mass: 121011, symbol: 'C', name: 'Carbon' },
        { position: 16, mass: 141007, symbol: 'N', name: 'Nitrogen' },
        { position: 18, mass: 886906, symbol: 'Y', name: 'Yttrium' },
        { position: 17, mass: 137833, symbol: 'Ba', name: 'Barium' },
        { position: 19, mass: 129011, symbol: 'C', name: 'Carbon' },
        { position: 20, mass: 143007, symbol: 'N', name: 'Nitrogen' },
        { position: 21, mass: 884906, symbol: 'Y', name: 'Yttrium' },
        { position: 22, mass: 134533, symbol: 'Ba', name: 'Barium' },
    ], [])

    const columns = useMemo(() => {
        return [
			{
				Header: 'Element position',
				accessor: 'position',
			},
			{
				Header: 'Atomic mass',
				accessor: 'mass',
				Cell: ({ value }: { value: number }) => (
					<NumberFormatter prefix="$" value={value} thousandSeparator="." decimalSeparator="," />
				),
			},
			
			{
				Header: 'Symbol',
				accessor: 'symbol',
			},
			{
				Header: 'Element name',
				accessor: 'name',
			},
			{
				Header: 'Action',
				accessor: '_',
				Cell: ({ row }: { row: any }) => (
					<Button
					onClick={()=>{
						setModalVisible(true)
					}}
					>
						Set State
					</Button>
				),
			},
        ]
    }, [])

    const handleExportGlobal = async (): Promise<any> => {
        const data = dataDummy
        // Create a new workbook
        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet('ReportToExcell')
    
        // Define the header style
        const headerStyle = {
          font: { bold: true },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '00FF00' },
          } as ExcelJS.FillPattern, // Red fill color
          border: {
            top: { style: 'thin' as ExcelJS.BorderStyle },
            left: { style: 'thin' as ExcelJS.BorderStyle },
            bottom: { style: 'thin' as ExcelJS.BorderStyle },
            right: { style: 'thin' as ExcelJS.BorderStyle },
          },
          alignment: { horizontal: 'center' as any }, // Center align the text
        }
    
        // Define the cell style
        const cellStyle = {
          border: {
            top: { style: 'thin' as ExcelJS.BorderStyle },
            left: { style: 'thin' as ExcelJS.BorderStyle },
            bottom: { style: 'thin' as ExcelJS.BorderStyle },
            right: { style: 'thin' as ExcelJS.BorderStyle },
          },
        }
    
        // Set the header row and apply the header style
        const headerRow = worksheet.getRow(1)
        headerRow.values = columns.filter((f)=>f.accessor !== '_').map((e)=> e.Header)
        headerRow.eachCell((cell) => {
          cell.fill = headerStyle.fill
          cell.font = headerStyle.font
          cell.border = headerStyle.border
        })
    
        // Populate the data rows and apply the cell style
        data.forEach((row, index) => {
          const dataRow = worksheet.getRow(index + 2)
          dataRow.values = [
            row.position,
            row.mass,
            row.symbol,
            row.name,
          ]
          dataRow.eachCell((cell) => {
            cell.border = cellStyle.border
          })
        })
    
        // Auto-fit columns
        worksheet.columns.forEach((column) => {
          column.width = 15
        })
    
        // Generate the Excel file
        const excelBuffer = await workbook.xlsx.writeBuffer()
    
        // Create a Blob and save the file
        const dataBlob = new Blob([excelBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })

        saveAs(dataBlob, 'ReportToExcell.xlsx')
	}

	const handleSubmit = ():void => {
		try {
			showLoadingSpinner()
			alert(formData.product_name);
			addNotification({
				position: 'top-right',
				message: 'Form Data ready to submit',
				type: 'success',
			})
			setModalVisible(false)
			handleReset()
		} catch (error) {
			handleError(error)
		} finally {
            hideLoadingSpinner()
		}
	}

	const handleReset = ():void => {
		setFormData(initialStateForm)
		setFiles([])
	}

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
                              setCheckedPagination(event.currentTarget.checked)
                          }} 
                          size="md"
                          onLabel="ON" 
                          offLabel="OFF"
                          label="Enable Pagination"
                        />
                        <Switch
                          checked={checkedSearch}
                          onChange={(event) => {
                            setCheckedSearch(event.currentTarget.checked)
                          }} 
                          size="md"
                          onLabel="ON" 
                          offLabel="OFF"
                          label="Enable Search Function"
                        />
                        <Switch
                          checked={checkedDownload}
                          onChange={(event) => {
                            setCheckedDownload(event.currentTarget.checked)
                          }} 
                          size="md"
                          onLabel="ON" 
                          offLabel="OFF"
                          label="Enable Export to Excell"
                        />
                        <Switch
                          checked={checkedCentered}
                          onChange={(event) => {
                            setCheckedCentered(event.currentTarget.checked)
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
                            label={'Label Button Export Excell'}
                            value={buttonLabel}
                            placeholder='Input button export label'
                            onChange={(e)=>{
                              if(e.target.value === '') {
                                setButtonLabel(undefined)
                              } else {
                                setButtonLabel(e.target.value)
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
      withPagination={${checkedPagination?'true':'false'}}
      withSearch={${checkedSearch?'true':'false'}}
      withDownload={${checkedDownload?'true':'false'}}
      centered={${checkedCentered?'true':'false'}}
      downloadBtnLabel={'${buttonLabel??'Export to Excell'}'}
      onDownload={()=>{
          handleExportGlobal()
      }}
    />
  `}
                      </Code>
                    </div>
                  </CardLayout>
                  <CardLayout>
                    <div className="flex flex-col">
                        <TabelComp
                            columns={columns}
                            data={dataDummy.sort((a, b)=> a.position - b.position)}
                            loading={false}
                            centered={checkedCentered}
                            withPagination={checkedPagination}
                            withSearch={checkedSearch}
                            withDownload={checkedDownload}
                            downloadBtnLabel={buttonLabel}
                            onDownload={()=>{
                                handleExportGlobal()
                            }}
                        />
                    </div>
                  </CardLayout>
                </div>
            </Layout>
            <Modal
              opened={modalVisible}
              onClose={()=>{
                setModalVisible(false)
              }}
              title="Create Product"
              size={'md'}
            >
				<div className="flex flex-col gap-2">
					<div className="flex gap-4 items-end">
						<div className="flex flex-col w-full">
							<TextInput
								label="Product Name"
								placeholder="Name of product"
								withAsterisk
								value={formData?.product_name}
								onChange={(e)=>{
									setFormData({...formData, product_name: e.target.value})
								}}
							/>
							<Select
								label="Product Category"
								placeholder="Choose Product Category"
								checkIconPosition="right"
								withAsterisk
								value={formData.product_cat}
								onChange={(e)=>{
									setFormData({...formData, product_cat: String(e)})
								}}
								data={[
									{
									label: 'Electronic',
									value: 'electronic',
									},
									{
									label: 'Fashion',
									value: 'fashion',
									},
									{
									label: 'Toys',
									value: 'toys',
									},
									{
									label: 'Other',
									value: 'other',
									},
								]}
							/>
						</div>
						<div className="flex flex-col w-fit">
							<Text size='sm' className='mb-1'>Product Image</Text>
							<Dropzone className='border border-white border-opacity-20 mt-1' accept={IMAGE_MIME_TYPE}
							onDrop={(e)=>{
								setFiles(e)
								setFormData({...formData, product_img: e})
							}}>
							<div className="relative w-[95px] h-[95px] object-cover">
								{previews.length < 1 ? (
								<Text size='sm' className='absolute w-full h-full flex items-center justify-center cursor-pointer transition-all'>Drop here</Text>
								):(
								<Text size='sm' className={`absolute w-full h-full flex items-center justify-center cursor-pointer transition-all hover:bg-black hover:bg-opacity-50 opacity-0 hover:opacity-100`}>Click here</Text>
								)}
								{previews}
							</div>
							</Dropzone>
						</div>
					</div>
					<Textarea
						label="Product Description"
						placeholder='Describe Your Product'
						withAsterisk
						autosize
						minRows={2}
						maxRows={4}
						value={formData?.product_desc}
						onChange={(e)=>{
							setFormData({...formData, product_desc: e.target.value})
						}}
					/>
					<div className="flex gap-2 justify-center mt-2">
						<Button
						onClick={()=>{
							handleSubmit()
						}}
						>
							Submit
						</Button>
						<Button
							variant='outline'
							onClick={()=>{
								setModalVisible(false)
								handleReset()
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
            </Modal>
        </>
    )
}
