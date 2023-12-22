import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations from "../locales";

i18n.use(LanguageDetector).init({
	resources: translations,
	partialBundledLanguages: true,
	nonExplicitSupportedLngs: true,
	fallbackLng: "en",
	debug: false,
	load: "languageOnly",
	defaultNS: "translations",
	ns: ["translations"],
	keySeparator: false,
	interpolation: {
		escapeValue: false,
		formatSeparator: ",",
	},
	react: {
		useSuspense: false,
	},
});
export default i18n;
