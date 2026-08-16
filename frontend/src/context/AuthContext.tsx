import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GetMe, Login, Register, Logout } from '../../wailsjs/go/backend/App';
import { AuthUser } from '../types/auth';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    login: (login: string, pass: string) => Promise<void>;
    register: (login: string, pass: string) => Promise<string>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuth = async () => {
        try {
            const currentUser = await GetMe();
            setUser(currentUser);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (loginStr: string, pass: string) => {
        const loggedInUser = await Login(loginStr, pass);
        setUser(loggedInUser);
    };

    const register = async (loginStr: string, pass: string) => {
        return await Register(loginStr, pass);
    };

    const logout = async () => {
        await Logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

// Хук для быстрого доступа к контексту в любом компоненте
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }
    return context;
}

