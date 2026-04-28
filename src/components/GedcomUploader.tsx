import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../config/api';

export default function GedcomUploader() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${API_BASE_URL}/api/heritage/upload-gedcom/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await response.json();
      setMessage(response.ok ? data.message || t('upload.gedcomUploaded') : data.error || t('upload.imageFailed'));
      if (response.ok) {
        setSelectedFile(null);
        if (fileRef.current) fileRef.current.value = '';
      }
    } catch {
      setMessage(t('ai.network'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <section style={{ border: '1px solid var(--surface-border)', borderRadius: 12, background: 'var(--surface-elev)', padding: '1rem' }}>
      <h2>{t('upload.gedcomTitle')}</h2>
      <form onSubmit={upload} style={{ display: 'grid', gap: 10 }}>
        <input
          ref={fileRef}
          type="file"
          accept=".ged"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
        />
        <button disabled={uploading || !selectedFile} type="submit">{uploading ? t('upload.processing') : t('upload.importData')}</button>
      </form>
      {message ? <p style={{ color: 'var(--surface-muted)' }}>{message}</p> : null}
    </section>
  );
}
