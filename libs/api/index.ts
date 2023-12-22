import api from "@/store/api";

export interface API_PROPS {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE" | "POST_MIRROR" | "PATCH";
	data?: any;
	formData?: any;
	params?: any;
	Customheaders?: any;
}

const fetcherSWR = async (props: API_PROPS): Promise<any> => {
	switch (props.method) {
		case "POST":
			return await fetcherPOST(props);
		case "PUT":
			return await fetcherPUT(props);
		case "DELETE":
			return await fetcherDELETE(props);
		case "GET":
			return await fetcherGET(props);
		case "PATCH":
			return await fetcherPATCH(props);
		default:
			return await fetcherGET(props);
	}
};

const parseFormData = async (data: any): Promise<FormData> => {
	const formData = new FormData();
	Object.entries(data).forEach(([key, value]) => {
		if (typeof value === "string" || value instanceof Blob) {
			formData.append(key, value);
		} else if (typeof value === "number") {
			formData.append(key, value.toString());
		} else if (typeof value === "boolean") {
			formData.append(key, value.toString());
		} else if (value instanceof Date) {
			const formattedDate = value
				.toISOString()
				.slice(0, 19)
				.replace("T", " ");
			formData.append(key, formattedDate);
		} else if (value instanceof Array) {
			// Handle array values by appending each item
			value.forEach((item, index) => {
				if (typeof item === "string" || item instanceof Blob) {
					formData.append(`${key}[${index}]`, item);
				} else if (typeof item === "number") {
					formData.append(`${key}[${index}]`, item.toString());
				} else if (typeof item === "boolean") {
					formData.append(`${key}[${index}]`, item.toString());
				} else if (item instanceof Date) {
					const formattedDate = item
						.toISOString()
						.slice(0, 19)
						.replace("T", " ");
					// const formattedDate = item.toUTCString();
					formData.append(`${key}[${index}]`, formattedDate);
				} else if (
					typeof item === "object" &&
					"id" in item &&
					"name" in item
				) {
					formData.append(`${key}[${index}].id`, item.id.toString());
					formData.append(`${key}[${index}].name`, item.name);
				}
			});
		}
	});
	return formData;
};

export const fetcherGET = async (props: API_PROPS): Promise<any> => {
	const response = await api.get(props.url, {
		params: props.params,
		headers: props.Customheaders,
	});
	return response.data;
};

export const fetcherPOST = async (props: API_PROPS): Promise<any> => {
	if (props.formData) {
		const data = await parseFormData(props.formData);
		const response = await api.post(`${props.url}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} else {
		const response = await api.post(props.url, props.data, {
			headers: props.Customheaders,
		});
		return response.data;
	}
};

export const fetcherPUT = async (props: API_PROPS): Promise<any> => {
	if (props.formData) {
		const data = await parseFormData(props.formData);
		const response = await api.put(`${props.url}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} else {
		const response = await api.put(props.url, props.data, {
			headers: props.Customheaders,
		});
		return response.data;
	}
};

export const fetcherDELETE = async (props: API_PROPS): Promise<any> => {
	const response = await api.delete(props.url, {
		headers: props.Customheaders,
	});
	return response;
};

export const fetcherPATCH = async (props: API_PROPS): Promise<any> => {
	if (props.formData) {
		const data = await parseFormData(props.formData);
		const response = await api.patch(`${props.url}`, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} else {
		const response = await api.patch(props.url, props.data, {
			headers: props.Customheaders,
		});
		return response.data;
	}
};

export default fetcherSWR;
