import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
// axiosInstance is preserved for future backend integration
// import axiosInstance from '../api/axiosInstance';
import type { User } from '../services/auth.service';
import { authService } from '../services/auth.service'; // This import is kept as it's used in the component.

interface AuthContextType {
    user: User | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (credentials: { username: string; password: string }) => {
        setLoading(true);
        try {
            const result: any = await authService.login(credentials);
            setUser(result.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
