import { LIST_LANGUAGE } from "./language";
const API_URL = "https://domain.backend:7023";

export { API_URL, LIST_LANGUAGE };

export const IMG_LOCAL_URL = "/img";

export const countryCodes = [
	{
		name: "Indonesia",
		code: "ID",
		dial_code: "(+62)",
	},
	{
		name: "Philippines",
		code: "PH",
		dial_code: "(+63)",
	},
	{
		name: "China",
		code: "Zh",
		dial_code: "(+86)",
	},
	{
		name: "Vietnam",
		code: "VI",
		dial_code: "(+84)",
	},
	{
		name: "Korea",
		code: "KR",
		dial_code: "(+82)",
	},
	{
		name: "Brazil",
		code: "BR",
		dial_code: "(+55)",
	},
];

export const RegexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegexPhone = /^(?:(?:\+62|)\d{8,12}|\+84\d{7,10}|\+63\d{10})$/;

export const RegexEwallet = /^08\d{9,11}$/;

export const RegexString = /^[A-Za-z][A-Za-z\s]*$/;

export const RegexNumber = /^[0-9]+$/;

export const RegexPassword =
	/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-=_+{}[\]:;"'<>,.?\\|]{6,}$/;

export const RegexTrc = /T[A-Za-z1-9]{33}/;

export const RegexURL =
	/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const RegexIPV4 =
	/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const RegexIPV6 =
	/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){2,2}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
