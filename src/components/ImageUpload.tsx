import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../config/api';

export default function ImageUpload() {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const upload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, { method: 'POST', body: formData, credentials: 'include' });
      const data = await response.json();
      setMessage(response.ok ? t('upload.imageSuccess') : data.error || t('upload.imageFailed'));
      if (response.ok && ref.current) ref.current.value = '';
    } catch {
      setMessage(t('ai.network'));
    } finally {
      setUploading(false);
    }
  };

  return (
    <section style={{ border: '1px solid var(--surface-border)', borderRadius: 12, background: 'var(--surface-elev)', padding: '1rem' }}>
      <h2>{t('upload.imageTitle')}</h2>
      <form onSubmit={upload} style={{ display: 'grid', gap: 10 }}>
        <input ref={ref} type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
        <input placeholder={t('upload.formTitle')} value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder={t('upload.description')} value={description} onChange={(e) => setDescription(e.target.value)} />
        <button disabled={uploading || !selectedFile} type="submit">{uploading ? t('common.uploading') : t('upload.imageTitle')}</button>
      </form>
      {message ? <p style={{ color: 'var(--surface-muted)' }}>{message}</p> : null}
    </section>
  );
}
