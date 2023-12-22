import useSWR, { type KeyedMutator } from 'swr'
import { FileWithPath } from "@mantine/dropzone"
import fetcherSWR, { API_PROPS } from "."

const ENDPOINT_PRODUCT = '/api/product'

export interface IProduct {
    product_name: string
    product_cat: string
    product_desc: string 
    product_img: string
}

interface IProductResult{
    dataProduct?:IProduct[]
    isLoadingProduct:boolean
    isErrorProduct:any
    mutateProduct:KeyedMutator<IProduct[]>
} 

export interface IProductPost {
    product_name: string
    product_cat: string
    product_desc: string 
    product_img: FileWithPath[] | []
}

export const GetProduct = (shouldFetch: boolean): IProductResult => {
    const apiProps: API_PROPS = {
        url: `${ENDPOINT_PRODUCT}`,
        method: 'GET',
    }
    const { data, isLoading, error, mutate } = useSWR<IProduct[]>(
        shouldFetch ? apiProps : null,
        fetcherSWR,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 3600000,
        },
    )
    return {
        dataProduct:data,
        isErrorProduct: error,
        isLoadingProduct: isLoading,
        mutateProduct:mutate
    }
}

export const CreateProduct = async (datax:IProductPost) : Promise<any> =>{
    const apiProps: API_PROPS = {
        url: `${ENDPOINT_PRODUCT}/create`,
        method: 'POST',
        formData:datax
    }
    return await fetcherSWR(apiProps)
}

export const EditProduct = async (datax:IProductPost) : Promise<any> =>{
	const apiProps : API_PROPS = {
        url: `${ENDPOINT_PRODUCT}/update`,
        method: 'PUT',
        formData:datax
	}
	return await fetcherSWR(apiProps)
}

export const deleteAdminVIPModel = async (id:number) : Promise<any> =>{
	const apiProps : API_PROPS = {
        url: `${ENDPOINT_PRODUCT}/delete/${id}`,
        method: 'DELETE'
	}
	return await fetcherSWR(apiProps)
}