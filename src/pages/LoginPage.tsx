import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import '../styles/AuthPages.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, username: email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || t('auth.loginFailed'));
        return;
      }

      if (data.username) localStorage.setItem('username', data.username);
      if (data.token) localStorage.setItem('authToken', data.token);
      localStorage.setItem('isStaff', data.is_staff ? 'true' : 'false');
      localStorage.setItem('isSuperuser', data.is_superuser ? 'true' : 'false');

      if (data.is_admin) {
        navigate('/admin/users');
      } else if (data.profile_completed && data.username) {
        navigate(`/profile/${data.username}`);
      } else {
        navigate('/profile');
      }
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
          <h1>{t('auth.welcomeBack')}</h1>
          <p>{t('auth.welcomeBackCopy')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              {t('auth.email')}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
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

            <button type="submit" disabled={isLoading}>
              {isLoading ? t('auth.loggingIn') : t('auth.login')}
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password">{t('auth.forgotPasswordQuestion')}</Link>
            <br />
            <Link to="/register">{t('auth.notMemberSignUp')}</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
