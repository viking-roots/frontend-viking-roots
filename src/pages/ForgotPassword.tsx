import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../styles/AuthPages.css';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch(API_ENDPOINTS.PASSWORD_RESET, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || t('auth.errors.resetSendFailed'));
        return;
      }

      setMessage(data.message || t('auth.messages.passwordResetSent'));
    } catch {
      setMessage(t('auth.errors.network'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-main">
        <div className="auth-card">
          <h1>{t('auth.forgotPassword')}</h1>
          <p>{t('auth.forgotCopy')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              {t('auth.email')}
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoFocus
              />
            </label>

            <button type="submit" disabled={isLoading}>
              {isLoading ? t('auth.sending') : t('auth.sendResetCode')}
            </button>
          </form>

          {message && <p className="otp-note">{message}</p>}

          <div className="auth-links">
            <Link to="/reset-password" state={{ email }}>
              {t('auth.enterResetCode')}
            </Link>
            <br />
            <Link to="/login">{t('auth.goToLogin')}</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
