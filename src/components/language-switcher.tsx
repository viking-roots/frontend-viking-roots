import type { ChangeEvent } from "react";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  isSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "@/i18n";
import { cn } from "@/lib/utils";

type LanguageOption = {
  code: SupportedLanguage;
  label: string;
};

type LanguageSwitcherProps = {
  className?: string;
};

const languageOptions: readonly LanguageOption[] = [
  { code: "en", label: "English" },
  { code: "is", label: "Íslenska" },
  { code: "pl", label: "Polski" },
  { code: "uk", label: "Українська" },
];

function getCurrentLanguage(language: string | undefined): SupportedLanguage {
  const normalizedLanguage = language?.split("-")[0] ?? "en";
  return isSupportedLanguage(normalizedLanguage) ? normalizedLanguage : "en";
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const currentLanguage = getCurrentLanguage(
    i18n.resolvedLanguage ?? i18n.language
  );

  const handleLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextLanguage = event.target.value;

    if (!supportedLanguages.includes(nextLanguage as SupportedLanguage)) {
      return;
    }

    void i18n.changeLanguage(nextLanguage);
  };

  return (
    <label
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-[#262626] bg-[#171717] px-3 text-sm font-semibold text-white transition-colors focus-within:border-[#c88a65] focus-within:ring-1 focus-within:ring-[#c88a65]/40",
        className
      )}
    >
      <Globe2 aria-hidden="true" className="h-4 w-4 text-[#c88a65]" />
      <span className="sr-only">{t("common.language")}</span>
      <select
        aria-label={t("common.language")}
        value={currentLanguage}
        onChange={handleLanguageChange}
        className="w-24 cursor-pointer bg-transparent text-sm text-white outline-none"
      >
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </label>
  );
}
