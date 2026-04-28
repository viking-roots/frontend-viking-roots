
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import ProjectsSection from '../components/ProjectSection';

export default function Gimli() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-bg)', color: 'var(--surface-fg)' }}>
      
      <main style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
        <h1>{t('pages.gimliTitle')}</h1>
        <p style={{ color: 'var(--surface-muted)' }}>
          {t('pages.gimliCopy')}
        </p>
      </main>
      <ProjectsSection />
      <Footer />
    </div>
  );
}
