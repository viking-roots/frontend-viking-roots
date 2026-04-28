import { useTranslation } from "react-i18next";

export function CtaSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full border-t border-[#262626] bg-[#0a0a0a] px-6 py-20 text-center lg:py-28">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-balance text-4xl font-bold text-white lg:text-5xl">
          {t("home.cta.title")}
        </h2>
        <p className="mt-4 text-base text-white/50">
          {t("home.cta.description")}
        </p>
      </div>
    </section>
  );
}
