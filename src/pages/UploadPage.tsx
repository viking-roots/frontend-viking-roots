import ImageUpload from '@/components/ImageUpload';
import GedcomUploader from '@/components/GedcomUploader';
import { useTranslation } from 'react-i18next';

export default function UploadPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="mx-auto flex max-w-7xl">
        <main className="flex-1 px-4 py-8 md:px-8">
          <div className="mx-auto max-w-xl flex flex-col gap-8">
            <h1 className="text-3xl font-bold text-white text-center">{t('upload.title')}</h1>
            <ImageUpload />
            <GedcomUploader />
          </div>
        </main>
      </div>
    </div>
  );
}
