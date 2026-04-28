import i18n from "i18next";
import LanguageDetector, {
  type DetectorOptions,
} from "i18next-browser-languagedetector";
import HttpBackend, { type HttpBackendOptions } from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const supportedLanguages = ["en", "is", "pl", "uk"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export function isSupportedLanguage(
  language: string
): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage);
}

const detection: DetectorOptions = {
  order: ["querystring", "localStorage"],
  caches: ["localStorage"],
  lookupQuerystring: "lng",
  lookupLocalStorage: "i18nextLng",
};

function syncHtmlLanguage(language: string | undefined) {
  const normalizedLanguage = language?.split("-")[0] ?? "en";
  document.documentElement.lang = isSupportedLanguage(normalizedLanguage)
    ? normalizedLanguage
    : "en";
}

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    fallbackLng: "en",
    supportedLngs: [...supportedLanguages],
    load: "languageOnly",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    debug: import.meta.env.DEV,
  })
  .then(() => syncHtmlLanguage(i18n.resolvedLanguage ?? i18n.language));

i18n.on("languageChanged", syncHtmlLanguage);

export default i18n;
