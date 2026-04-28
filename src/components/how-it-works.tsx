import { useTranslation } from "react-i18next";

const steps = [
  {
    titleKey: "home.howItWorks.joinTitle",
    descriptionKey: "home.howItWorks.joinDescription",
  },
  {
    titleKey: "home.howItWorks.uploadTitle",
    descriptionKey: "home.howItWorks.uploadDescription",
  },
  {
    titleKey: "home.howItWorks.preserveTitle",
    descriptionKey: "home.howItWorks.preserveDescription",
  },
] as const;

export function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="w-full border-t border-[#262626] bg-[#0a0a0a] px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-4xl font-bold text-white lg:text-5xl">
          {t("home.howItWorks.title")}
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.titleKey}
              className="relative rounded-md p-6"
            >
              {/* Gradient Border using mask to keep background transparent */}
              <div
                className="absolute inset-0 rounded-md pointer-events-none"
                style={{
                  padding: "1px",
                  background: "linear-gradient(135deg, #f5d5c6 0%, #c8967d 50%, #784a38 100%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />
              <h3 
                className="mb-3 text-base font-bold uppercase tracking-wide"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f5d5c6 0%, #c8967d 50%, #784a38 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t(step.titleKey)}
              </h3>
              <p className="relative text-sm leading-relaxed text-white/80">
                {t(step.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
