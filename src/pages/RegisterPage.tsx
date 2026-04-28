import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../styles/AuthPages.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert(t('auth.errors.passwordMismatch'));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username: fullName,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || t('auth.errors.registrationFailed'));
        return;
      }

      navigate('/otp-verify', { state: { email } });
    } catch {
      alert(t('auth.errors.network'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      
      <main className="auth-main">
        <div className="auth-card">
          <h1>{t('auth.createAccount')}</h1>
          <p>{t('auth.startBuildingProfile')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              {t('auth.fullName')}
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoFocus
              />
            </label>

            <label>
              {t('auth.email')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              {t('auth.password')}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label>
              {t('auth.confirmPassword')}
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" disabled={isLoading}>
              {isLoading ? t('auth.signingUp') : t('auth.signUp')}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/login">{t('auth.alreadyHaveAccountLogin')}</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
