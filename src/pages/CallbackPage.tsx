import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './CallbackPage.css';

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError('Authorization failed. Please try again.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (!code) {
      setError('No authorization code received.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch(`/api/callback?code=${code}`);

        if (!response.ok) {
          throw new Error('Failed to exchange token');
        }

        const data = await response.json();
        await login(data.access_token);
        navigate('/dashboard');
      } catch (err) {
        console.error('Token exchange error:', err);
        setError('Authentication failed. Please try again.');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    exchangeToken();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="callback-page">
        <div className="callback-message error">
          <p className="text-preset-4">{error}</p>
          <p className="text-preset-7">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="callback-page">
      <div className="callback-message">
        <p className="text-preset-4">Completing authentication...</p>
      </div>
    </div>
  );
}
