import React from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');

const root = createRoot(container!);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
