import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../../config/api';

export function FaceTaggingSettings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    face_tagging_enabled: false,
    tagging_scope: 'manual_approval'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.RECOGNITION_SETTINGS, { credentials: 'include' });
      const data = await res.json();
      if (res.ok) setSettings(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    const newVal = !settings.face_tagging_enabled;
    updateSettings({ face_tagging_enabled: newVal });
  };

  const handleScopeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ tagging_scope: e.target.value });
  };

  const updateSettings = async (updates: Partial<typeof settings>) => {
    setSaving(true);
    try {
      const res = await fetch(API_ENDPOINTS.RECOGNITION_SETTINGS, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        credentials: 'include'
      });
      if (res.ok) {
        setSettings(prev => ({ ...prev, ...updates }));
      }
    } catch (err) {
      console.error('Error updating settings:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse h-24 bg-[#171717] rounded-xl" />;

  return (
    <div className="rounded-xl border border-[#262626] bg-[#171717] p-6">
      <h3 className="text-lg font-bold text-white mb-4">{t('recognition.privacyTagging')}</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{t('recognition.enableFaceTagging')}</p>
            <p className="text-xs text-white/50">{t('recognition.enableFaceTaggingCopy')}</p>
          </div>
          <button
            onClick={handleToggle}
            disabled={saving}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              settings.face_tagging_enabled ? 'bg-[#c88a65]' : 'bg-[#262626]'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.face_tagging_enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">{t('recognition.taggingScope')}</p>
            <p className="text-xs text-white/50">{t('recognition.taggingScopeCopy')}</p>
          </div>
          <select
            value={settings.tagging_scope}
            onChange={handleScopeChange}
            disabled={saving || !settings.face_tagging_enabled}
            className="rounded-lg border border-[#262626] bg-[#0a0a0a] px-3 py-1 text-xs text-white outline-none focus:border-[#c88a65]"
          >
            <option value="friends_only">{t('recognition.friendsOnly')}</option>
            <option value="manual_approval">{t('recognition.manualApproval')}</option>
            <option value="nobody">{t('recognition.nobody')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
