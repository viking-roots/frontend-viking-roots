import { useTheme } from '@/context/theme-context';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="rounded-full border border-[#3a3a3a] px-3 py-1.5 text-xs font-semibold text-[var(--surface-fg)] transition-colors hover:border-[#c88a65] hover:text-[#c88a65]"
      aria-label={t('common.toggleColorTheme')}
      title={t('common.toggleColorTheme')}
    >
      {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
    </button>
  );
}
