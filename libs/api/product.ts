import { FileWithPath } from "@mantine/dropzone";
import useSWR, { type KeyedMutator } from "swr";
import fetcherSWR, { API_PROPS } from ".";

const ENDPOINT_PRODUCT = "/products";

export interface IProduct {
	product_name: string;
	product_cat: string;
	product_desc: string;
	product_img: string;
}

export interface IProductItems {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[]
}


interface IProductItemsResult {
	dataSingleProduct?: IProductItems;
	isLoadingSingleProduct: boolean;
	isErrorSingleProduct: any;
	mutateSingleProduct: KeyedMutator<IProductItems>;
}

export interface IProductDummy {
    limit: number,
    products: IProductItems[],
    skip: number,
    total: number,
}

export interface IProductsDummy {
    limit: number,
    products: IProductItems[],
    skip: number,
    total: number,
}

export interface ISProductDummy {
    limit: number,
    products: IProductItems[],
    skip: number,
    total: number,
}

interface IProductDummyResult {
	dataProduct?: IProductDummy;
	isLoadingProduct: boolean;
	isErrorProduct: any;
	mutateProduct: KeyedMutator<IProductDummy>;
}

interface IProductSDummyResult {
	dataSProduct?: IProductDummy;
	isLoadingSProduct: boolean;
	isErrorSProduct: any;
	mutateSProduct: KeyedMutator<IProductDummy>;
}

export interface IProductPost {
	product_name: string;
	product_cat: string;
	product_desc: string;
	product_img: FileWithPath[] | [];
}

export const GetProduct = (shouldFetch: boolean): IProductDummyResult => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}`,
		method: "GET",
	};
	const { data, isLoading, error, mutate } = useSWR<IProductDummy>(
		shouldFetch ? apiProps : null,
		fetcherSWR,
		{}
	);
	return {
		dataProduct: data,
		isErrorProduct: error,
		isLoadingProduct: isLoading,
		mutateProduct: mutate,
	};
};

export const GetProductWPagination = (shouldFetch: boolean, limit:number, skip: number): IProductDummyResult => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}?limit=${limit}&skip=${skip}`,
		method: "GET",
	};
	const { data, isLoading, error, mutate } = useSWR<IProductsDummy>(
		shouldFetch ? apiProps : null,
		fetcherSWR,
		{}
	);
	return {
		dataProduct: data,
		isErrorProduct: error,
		isLoadingProduct: isLoading,
		mutateProduct: mutate,
	};
};

export const SearchProduct = (shouldFetch: boolean, search: string): IProductSDummyResult => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}/search?q=${search}`,
		method: "GET",
	};
	const { data, isLoading, error, mutate } = useSWR<ISProductDummy>(
		shouldFetch ? apiProps : null,
		fetcherSWR,
		{}
	);
	return {
		dataSProduct: data,
		isErrorSProduct: error,
		isLoadingSProduct: isLoading,
		mutateSProduct: mutate,
	};
};

export const GetSingleProduct = (shouldFetch: boolean, id: number): IProductItemsResult => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}/${id}`,
		method: "GET",
	};
	const { data, isLoading, error, mutate } = useSWR<IProductItems>(
		shouldFetch ? apiProps : null,
		fetcherSWR,
		{}
	);
	return {
		dataSingleProduct: data,
		isErrorSingleProduct: error,
		isLoadingSingleProduct: isLoading,
		mutateSingleProduct: mutate,
	};
};

export const CreateProduct = async (datax: IProductPost): Promise<any> => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}/create`,
		method: "POST",
		formData: datax,
	};
	return await fetcherSWR(apiProps);
};

export const EditProduct = async (datax: IProductPost): Promise<any> => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}/update`,
		method: "PUT",
		formData: datax,
	};
	return await fetcherSWR(apiProps);
};

export const deleteAdminVIPModel = async (id: number): Promise<any> => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_PRODUCT}/delete/${id}`,
		method: "DELETE",
	};
	return await fetcherSWR(apiProps);
};
