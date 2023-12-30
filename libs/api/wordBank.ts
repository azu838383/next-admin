import { FileWithPath } from "@mantine/dropzone";
import useSWR, { type KeyedMutator } from "swr";
import fetcherSWR, { API_PROPS } from ".";

const ENDPOINT_WORD_BANK = "/word";

export interface IWordBank {
	text_quiz: string,
}

interface IWordBankResult {
	dataWord?: IWordBank[];
	isLoadingWord: boolean;
	isErrorWord: any;
	mutateWord: KeyedMutator<IWordBank[]>;
}

export const GetWordBank = (shouldFetch: boolean): IWordBankResult => {
	const apiProps: API_PROPS = {
		url: `${ENDPOINT_WORD_BANK}/bank`,
		method: "GET",
	};
	const { data, isLoading, error, mutate } = useSWR<IWordBank[]>(
		shouldFetch ? apiProps : null,
		fetcherSWR,
		{}
	);
	return {
		dataWord: data,
		isErrorWord: error,
		isLoadingWord: isLoading,
		mutateWord: mutate,
	};
};