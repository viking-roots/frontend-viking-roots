import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { KinLogo } from "@/components/kin-logo";

const footerLinks = [
  { labelKey: "common.privacy", href: "/privacy" },
  { labelKey: "common.terms", href: "/terms" },
  { labelKey: "common.about", href: "/about" },
  { labelKey: "common.contact", href: "/contact" },
] as const;

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/VikingRoots/", icon: "/socials/fb.png" },
  { label: "Instagram", href: "https://www.instagram.com/vikingroots/", icon: "/socials/ig.png" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/vikingroots/", icon: "/socials/yt.png" },
  { label: "TikTok", href: "https://www.tiktok.com/@thevikingroots", icon: "/socials/tk.png" },
  { label: "X", href: "https://x.com/TheVikingRoots", icon: "/socials/x.png" },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t border-[#262626] bg-[#0a0a0a] px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6">
        <Link to="/" aria-label={t("footer.homeLabel")}>
          <KinLogo size={56} />
        </Link>

        <nav aria-label={t("footer.navigationLabel")}>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.labelKey}>
                <Link
                  to={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-[#c88a65]"
                >
                  {t(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("footer.socialLabel")}>
          <ul className="flex gap-6">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-110"
                  aria-label={link.label}
                >
                  <img
                    src={link.icon}
                    alt={link.label}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
