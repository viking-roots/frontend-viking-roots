import { type FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../styles/AuthPages.css';

type ResetLocationState = {
  email?: string;
};

export default function ResetPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const state = location.state as ResetLocationState | null;
  const queryParams = new URLSearchParams(location.search);
  const queryEmail = queryParams.get('email') || '';
  const queryToken = queryParams.get('token') || '';
  const isInviteSetup = queryParams.get('source') === 'invite' || Boolean(queryToken);
  const hasTokenFromLink = Boolean(queryToken);

  const [email, setEmail] = useState(state?.email || queryEmail);
  const [token, setToken] = useState(queryToken);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');

    if (newPassword !== confirmPassword) {
      setMessage(t('auth.errors.passwordMismatch'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.PASSWORD_RESET_CONFIRM, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email,
          token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || t('auth.errors.resetFailed'));
        return;
      }

      setIsComplete(true);
      setMessage(isInviteSetup ? t('auth.messages.passwordSetSuccess') : data.message || t('auth.messages.passwordResetSuccess'));
      setToken('');
      setNewPassword('');
      setConfirmPassword('');
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
          <h1>{isInviteSetup ? t('auth.setPassword') : t('auth.resetPassword')}</h1>
          <p>{isInviteSetup ? t('auth.setPasswordCopy') : t('auth.resetCopy')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              {t('auth.email')}
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                readOnly={hasTokenFromLink}
                autoFocus={!email}
              />
            </label>

            {!hasTokenFromLink && (
              <label>
                {t('auth.resetCode')}
                <input
                  type="text"
                  value={token}
                  onChange={(event) => setToken(event.target.value)}
                  required
                  autoFocus={Boolean(email)}
                />
              </label>
            )}

            <label>
              {t('auth.newPassword')}
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
                autoFocus={Boolean(email && token)}
              />
            </label>

            <label>
              {t('auth.confirmNewPassword')}
              <input
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>

            <button type="submit" disabled={isLoading || isComplete}>
              {isLoading ? t('auth.resetting') : isInviteSetup ? t('auth.setPassword') : t('auth.resetPassword')}
            </button>
          </form>

          {message && <p className="otp-note">{message}</p>}

          <div className="auth-links">
            {isComplete ? <Link to="/login">{t('auth.goToLogin')}</Link> : <Link to="/forgot-password">{t('auth.requestNewCode')}</Link>}
          </div>
        </div>
      </main>
    </div>
  );
}
