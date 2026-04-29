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
    <section className="rounded-2xl border border-white/10 bg-[#121212] p-8 shadow-xl">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">{t('upload.gedcomTitle')}</h2>
      <form onSubmit={upload} className="flex flex-col gap-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">
            {t('upload.gedcomTitle')}
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".ged"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#c88a65]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#c88a65] hover:file:bg-[#c88a65]/20 focus:outline-none"
          />
        </div>
        <button
          disabled={uploading || !selectedFile}
          type="submit"
          className="mt-4 w-full rounded-full bg-[linear-gradient(to_right,#c88a65_-55%,white)] px-6 py-3 text-base font-bold text-[#000] transition-all hover:bg-[linear-gradient(to_right,#eab2a0,white)] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {uploading ? t('upload.processing') : t('upload.importData')}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm text-[#c88a65]">{message}</p> : null}
    </section>
  );
}
