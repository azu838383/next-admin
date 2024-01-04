import { FileWithPath } from "@mantine/dropzone";
import useSWR, { type KeyedMutator } from "swr";
import fetcherSWR, { API_PROPS } from ".";

const ENDPOINT_WORD_BANK = "/word";

export interface IRegisData {
	name: string,
}

export interface IScrambleWords {
	name: string
	resultOne: string
	resultTwo: string
	resultThree: string
}

export interface IResultScore {
	name: string
	trueAnswer: number
	score: number
}

export interface IResultData {
	status: boolean
	data: IResultScore
}

export const RegisStart = async (datax: IRegisData): Promise<string[]> => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_WORD_BANK}/bank`,
		method: "POST",
		data: datax,
	};
	return await fetcherSWR(apiProps);
};

export const SubmitResult = async (datax: IScrambleWords): Promise<any> => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_WORD_BANK}/postResult`,
		method: "POST",
		data: datax,
	};
	return await fetcherSWR(apiProps);
};