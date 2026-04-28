import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function FeaturedProject() {
  const { t } = useTranslation();

  return (
    <section className="w-full border-t border-[#262626] bg-[#0a0a0a] px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-4xl font-bold text-white lg:text-5xl">
          {t("home.featured.title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-white/60">
          {t("home.featured.description")}
        </p>
        <Link
          to="/projects/gimli-saga"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,#c88a65_-55%,white)] px-6 py-3 text-base font-bold text-[#000] transition-all hover:bg-[linear-gradient(to_right,#eab2a0,white)] hover:text-white"
        >
          {t("home.featured.cta")}
        </Link>
      </div>
    </section>
  );
}
