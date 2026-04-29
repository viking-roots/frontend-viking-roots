import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
      <h1 className="text-6xl font-bold text-[#c88a65]">Coming Soon</h1>
      <p className="mt-4 text-lg text-white/70">This page is under construction.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-[linear-gradient(to_right,#c88a65_-55%,white)] px-6 py-3 text-base font-bold text-[#000] transition-all hover:bg-[linear-gradient(to_right,#eab2a0,white)] hover:text-white"
      >
        {t("pages.goHome")}
      </Link>
    </div>
  );
}
