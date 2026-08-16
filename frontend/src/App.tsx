import React from 'react';
import './App.css';
import { useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';

function App() {
    const { user, loading, logout } = useAuth();

    if (loading) return <div>Загрузка приложения...</div>;

    if (!user) return <LoginScreen />;

    return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ccc' }}>
        <h3>Добро пожаловать, {user.login}!</h3>
        <button onClick={logout}>Выйти</button>
      </header>
      
      <main style={{ marginTop: '20px' }}>
        <p>Здесь находится защищенный контент приложения.</p>
        {/* Любой дочерний компонент отсюда теперь может вызвать useAuth() */}
      </main>
    </div>
  );
}

export default App
