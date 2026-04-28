import { useTranslation } from "react-i18next";

export function KinLogo({ size = 44 }: { size?: number }) {
  const { t } = useTranslation();

  return (
    <img
      src="/img/Logo-Transparent.png"
      alt={t("common.logoAlt")}
      style={{ width: size, height: size, objectFit: "contain" }}
      className="rounded-md"
    />
  );
}
