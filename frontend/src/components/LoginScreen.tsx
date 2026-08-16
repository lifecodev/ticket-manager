import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AuthMode } from '../types/auth';

export function LoginScreen() {
  const { login, register } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [loginInput, setLoginInput] = useState('');
  const [passInput, setPassInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      if (authMode === 'register') {
        const res = await register(loginInput, passInput);
        setMessage(res);
        setAuthMode('login');
      } else {
        await login(loginInput, passInput);
      }
      setLoginInput('');
      setPassInput('');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
      <h2>{authMode === 'register' ? 'Регистрация' : 'Вход в систему'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Логин" 
          value={loginInput} 
          onChange={(e) => setLoginInput(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Пароль" 
          value={passInput} 
          onChange={(e) => setPassInput(e.target.value)} 
          required 
        />
        <button type="submit">{authMode === 'register' ? 'Создать аккаунт' : 'Войти'}</button>
      </form>

      {message && <p style={{ color: 'blue' }}>{message}</p>}

      <button 
        style={{ background: 'none', border: 'none', color: 'gray', marginTop: '15px', cursor: 'pointer' }}
        onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
      >
        {authMode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
      </button>
    </div>
  );
}

