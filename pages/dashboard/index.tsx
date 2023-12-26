import Layout from "@/components/layout";
import CardLayout from "@/components/layout/CardLayout";
import { GetProductWPagination, GetSingleProduct, IProductItems, SearchProduct } from "@/libs/api/product";
import { Badge, Button, Card, Group, Modal, NumberFormatter, Pagination, Select, Skeleton, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
import appConfig from "../../app.json";
import Image from "next/image";

export default function Dashboard() {

	const [limit, setLimit] = useState<number>(8)
	const [skip, setSkip] = useState<number>(0)
	const [page, setPage] = useState(1)
	const { dataProduct, isLoadingProduct, isErrorProduct, mutateProduct } = GetProductWPagination(true, limit, skip)

	const [dataOnState, setDataOnState] = useState<IProductItems[]>(dataProduct?.products ?? [])
	const [textSearch, setTextSearch] = useState<string>('')
	const [productId, setProductId] = useState<number>(-1)
	const [detailVisible, setDetailVisible] = useState(false)
	const [searchValue, setSearchValue] = useDebouncedState('', 300)
	const { dataSProduct, isErrorSProduct, isLoadingSProduct, mutateSProduct } = SearchProduct(true, searchValue)
	const { dataSingleProduct, isErrorSingleProduct, isLoadingSingleProduct, mutateSingleProduct } = GetSingleProduct(detailVisible, productId)

	const totalPage = Math.ceil(Number(dataProduct?.total ?? 0) / limit)
	const cardsArray = new Array(limit).fill(null)
	useEffect(() => {
		setSkip((page - 1) * limit)
		setSearchValue(textSearch)
		if (searchValue) {
			setDataOnState(dataSProduct?.products ?? [])
		} else {
			setDataOnState(dataProduct?.products ?? [])
		}
	}, [page, textSearch, dataProduct, dataSProduct, searchValue])

	return (
		<>
			<Head>
				<title>Dashboard | {appConfig.name}</title>
			</Head>
			<Layout>
				<CardLayout className="flex flex-col gap-4">
					<div className="flex justify-end">
						<TextInput
							leftSectionPointerEvents="none"
							leftSection={<MdSearch />}
							placeholder="Search Product"
							value={textSearch}
							onChange={(e) => {
								setTextSearch(e.target.value)
							}}
						/>
					</div>
					<div className="grid grid-cols-4 gap-4">
						{isLoadingProduct || isLoadingSProduct ? (
							cardsArray.map((_, index) => (
								<Card
									key={index}
									shadow="sm"
									padding="lg"
									radius="md"
									withBorder
									className="min-h-[180px] flex flex-col justify-between"
								>
									<Card.Section>
										<Skeleton height={160} radius="none" />
									</Card.Section>

									<Group justify="space-between" mt="md" mb="xs">
										<Skeleton height={24} mt={4} radius="xl" width={"70%"} />
									</Group>
									<Text size="sm" c="dimmed" className="line-clamp-2">
										<Skeleton height={14} radius="xl" />
										<Skeleton height={14} mt={10} radius="xl" />
									</Text>

									<Button color="blue" fullWidth mt="md" radius="md">
										Detail
									</Button>
								</Card>
							))
						) : dataOnState.map((e) => (
							<Card key={e.id} shadow="sm" padding="lg" radius="md" withBorder className="min-h-[180px] flex flex-col justify-between">
								<Card.Section>
									<Image
										src={e.images[0]}
										height={160}
										width={350}
										alt="Product"
										className="h-[160px] object-cover object-center"
									/>
								</Card.Section>

								<Group justify="space-between" mt="md" mb="xs" className="relative">
									<Text fw={500} className="line-clamp-1 w-[70%]">{e.title}</Text>
									<Badge className="">
										<NumberFormatter
											prefix="$"
											thousandSeparator
											value={e.price}
										/>
									</Badge>
								</Group>
								<Text size="sm" c="dimmed" className="line-clamp-2">
									{e.description}
								</Text>

								<Button
									onClick={() => {
										setProductId(e.id)
										setDetailVisible(true)
									}}
									color="blue" fullWidth mt="md" radius="md">
									Detail
								</Button>
							</Card>
						))}
					</div>
					<div className="flex justify-between">
						<div className="block min-w-10 min-h-full">
							<Pagination value={page} onChange={setPage} total={totalPage} />
						</div>
						<div className="">
							<Select
								allowDeselect={false}
								data={[
									{
										label: "1 Row",
										value: "4"
									},
									{
										label: "2 Row",
										value: "8"
									},
									{
										label: "3 Row",
										value: "12"
									},
								]}
								value={String(limit)}
								onChange={(e) => {
									setLimit(Number(e))
								}}
							/>
						</div>
					</div>
				</CardLayout>
				<Modal
					opened={detailVisible}
					onClose={() => {
						setDetailVisible(false)
					}}
					title="Product Detail"
					size={"sm"}
					centered>
					{isLoadingSingleProduct ? (
						<Card
							shadow="sm"
							padding="lg"
							radius="md"
							withBorder
							className="min-h-[180px] flex flex-col justify-between"
						>
							<Card.Section>
								<Skeleton height={300} radius="none" />
							</Card.Section>

							<Group justify="space-between" mt="md" mb="xs">
								<Skeleton height={24} mt={4} radius="xl" width={"70%"} />
							</Group>
							<Text size="sm" c="dimmed" className="line-clamp-2">
								<Skeleton height={14} radius="xl" />
								<Skeleton height={14} mt={10} radius="xl" />
							</Text>

							<Button color="blue" fullWidth mt="md" radius="md">
								Detail
							</Button>
						</Card>
					) : (
						<Card shadow="sm" padding="lg" radius="md" withBorder className="min-h-[180px] flex flex-col justify-between">
							<Card.Section>
								<Image
									src={dataSingleProduct?.images[0] ?? ''}
									height={360}
									width={400}
									alt="Product"
									className="object-contain object-center"
								/>
							</Card.Section>
							<Group justify="space-between" mt="md" mb="xs">
								<Text fw={500}>{dataSingleProduct?.title}</Text>
								<Badge>
									<NumberFormatter
										prefix="$"
										thousandSeparator
										className="text-base !font-normal"
										value={dataSingleProduct?.price}
									/>
								</Badge>
							</Group>
							<Text size="sm" c="dimmed">
								{dataSingleProduct?.description}
							</Text>
						</Card>
					)}
				</Modal>
			</Layout>
		</>
	);
}
