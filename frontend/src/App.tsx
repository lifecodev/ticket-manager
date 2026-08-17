import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './context/AuthContext';
import { LoginScreen } from './components/LoginScreen';
import { TicketsScreen } from './components/TicketsScreen';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        }
    }
});

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
        <TicketsScreen />
      </main>
    </div>
  );
}

export default App
