import * as Excel from "exceljs";
import fs from "fs";
import { snakeCase } from "lodash";
import * as path from "path";
import { CellValue } from "react-table";

interface SheetList {
	[key: string]: string;
}

const SHEET_LIST = {
	ENGLISH: "en",
	FRENCH: "fr",
	SPANISH: "es",
	GERMAN: "de",
	ITALIAN: "it",
	RUSSIAN: "ru",
	JAPANESE: "ja",
	ARAB: "ar",
	CHINESE: "zh",
	KOREAN: "kr",
	SUOMI: "fi",
	"TIẾNG VIỆT": "vi",
	VIETNAM: "vi",
	INDONESIAN: "id",
	日本語: "ja",
	한국어: "kr",
	FRANÇAIS: "fr",
	ESPAÑOL: "es",
	FILIPINO: "fil",
	हिन्दी: "hi",
	HINDI: "hi",
	TÜRKÇE: "tr",
	فارسی: "fa",
	PORTUGIS: "pt",
	РУCCКИЙ: "ru",
	DEUTSCH: "de",
	ภาษาไทย: "th",
	POLSKI: "pl",
	ITALIANO: "it",
};

const typedSheetList: SheetList = SHEET_LIST;

let workbook = new Excel.Workbook();
const filePath = path.join(__dirname, process.argv[2]);

if (!fs.existsSync(filePath)) {
	process.exit(1);
}

let translationJson: { [key: string]: any } = {};
let currentPage = "";
workbook.xlsx.readFile(filePath).then(async () => {
	workbook.eachSheet(async (worksheet, sheetId) => {
		const sheetName: string = worksheet.name;

		if (!(sheetName in SHEET_LIST)) {
			console.error(`Sheet "${sheetName}" not found in the SHEET_LIST.`);
			return; // Exit the current sheet iteration
		}

		await worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
			if (rowNumber < 3) return;

			const values = row.values as CellValue[]; // Ensure values are of type CellValue[]

			const key = snakeCase(sanitizeCellValue(values[3]));

			if (values[2] && values[2] !== currentPage) {
				if (sheetName in typedSheetList) {
					writeJsonFile({
						folder: typedSheetList[sheetName],
						fileName:
							snakeCase(sanitizeCellValue(currentPage)) + ".json",
						data: translationJson,
					});
				} else {
					// Handle the case where sheetName doesn't exist in SHEET_LIST
					console.error(
						`Sheet '${sheetName}' not found in SHEET_LIST.`
					);
				}
				currentPage = values[2];
				translationJson = {};
			} else {
				if (!values[3]) return;
				translationJson[key] = sanitizeCellValue(values[4]);
			}
		});
	});
});

const writeJsonFile = ({
	folder,
	fileName,
	data,
}: {
	folder: string;
	fileName: string;
	data: any;
}) => {
	const folderPath = path.join(__dirname, "../" + folder);
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath);
	}
	fs.writeFileSync(
		path.join(folderPath, fileName),
		JSON.stringify(data, null, 2)
	);
};

interface RichText {
	text: string;
	// Define other properties as needed
}

interface CellValueObject {
	richText?: RichText[];
	result?: string;
	// Define other properties as needed
}

const sanitizeCellValue = (
	cellValue: string | CellValueObject | undefined
): string => {
	let transformedValue: string = "";

	if (typeof cellValue === "string") {
		transformedValue = cellValue;
	} else if (typeof cellValue === "object" && cellValue !== null) {
		if (cellValue.richText) {
			// Rich Text Type
			transformedValue = cellValue.richText
				.map((rt: RichText) => rt.text || "")
				.join("");
		} else if (cellValue.result) {
			// Formula Type
			transformedValue = cellValue.result;
		}
	}

	return transformedValue || "";
};
