import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-[#c88a65]">Future Feature</h1>
      <p className="mt-4 text-lg text-white/70">Coming Soon</p>
    </div>
  );
}
