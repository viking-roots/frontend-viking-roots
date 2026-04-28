import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const items = [
  {
    titleKey: 'projects.vikingRootsTitle',
    descriptionKey: 'projects.vikingRootsCopy',
    href: '/overview',
  },
  {
    titleKey: 'projects.gimliSagaTitle',
    descriptionKey: 'projects.gimliSagaCopy',
    href: '/gimli',
  },
  {
    titleKey: 'projects.missionTitle',
    descriptionKey: 'projects.missionCopy',
    href: '/overview',
  },
] as const;

export default function ProjectsSection() {
  const { t } = useTranslation();

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
      <h2 style={{ color: 'var(--surface-fg)', fontSize: '1.8rem', marginBottom: '0.75rem' }}>{t('projects.title')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 12 }}>
        {items.map((item) => (
          <article key={item.titleKey} style={{ border: '1px solid var(--surface-border)', borderRadius: 12, background: 'var(--surface-elev)', padding: '1rem' }}>
            <h3 style={{ marginTop: 0 }}>{t(item.titleKey)}</h3>
            <p style={{ color: 'var(--surface-muted)' }}>{t(item.descriptionKey)}</p>
            <Link to={item.href} style={{ color: '#b98d11', fontWeight: 700 }}>{t('projects.learnMore')}</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
