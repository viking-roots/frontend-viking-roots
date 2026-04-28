
import { useTranslation } from 'react-i18next';
import { Footer } from '../components/Footer';
import GedcomUploader from '../components/GedcomUploader';
import ImageUpload from '../components/ImageUpload';

export default function ProfileSetup() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface-bg)', color: 'var(--surface-fg)' }}>
      
      <main style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem', display: 'grid', gap: 14 }}>
        <h1>{t('profile.profileSetup')}</h1>
        <p style={{ color: 'var(--surface-muted)' }}>{t('profile.profileSetupCopy')}</p>
        <ImageUpload />
        <GedcomUploader />
      </main>
      <Footer />
    </div>
  );
}
