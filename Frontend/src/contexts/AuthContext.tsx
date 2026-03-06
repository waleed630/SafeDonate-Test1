import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, UserRole } from '../types';
import api from '../api/axios';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (payload: { email: string; password: string; username?: string; role?: UserRole }) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Real backend will return { user, accessToken, refreshToken }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('safedonate_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('safedonate_token'));

  const login = useCallback(async (email: string, password: string, role?: UserRole) => {
    const payload: any = { email, password };

    const res = await api.post('/auth/login', payload);
    const data = res.data;
    if (!data || !data.user) throw new Error(data?.message || 'Login failed');

    // Map backend user -> frontend User
    const u: User = {
      id: data.user.userId || data.user.id || data.user._id,
      email: data.user.email,
      name: data.user.username || data.user.name || '',
      role: data.user.role,
      avatar: data.user.profilePicture || undefined,
    };

    setUser(u);
    setToken(data.accessToken || null);
    localStorage.setItem('safedonate_user', JSON.stringify(u));
    if (data.accessToken) localStorage.setItem('safedonate_token', data.accessToken);
  }, []);

  const register = useCallback(async (payload: { email: string; password: string; username?: string; role?: UserRole }) => {
    try {
      const url = (api.defaults.baseURL || '') + '/auth/register';
      console.debug('[Auth] POST', url, payload);
    // Send allowed fields + role so backend stores correct role
    const body = {
      email: payload.email,
      password: payload.password,
      username: payload.username,
      role: payload.role,
    };
    const res = await api.post('/auth/register', body);
      const data = res.data;
      if (!data || !data.user) throw new Error(data?.message || 'Registration failed');

      const u: User = {
        id: data.user.userId || data.user.id || data.user._id,
        email: data.user.email,
        name: data.user.username || data.user.name || '',
        role: data.user.role,
        avatar: data.user.profilePicture || undefined,
      };

      setUser(u);
      setToken(data.accessToken || null);
      localStorage.setItem('safedonate_user', JSON.stringify(u));
      if (data.accessToken) localStorage.setItem('safedonate_token', data.accessToken);
      return;
    } catch (err: any) {
      console.error('[Auth] register error', {
        baseURL: api.defaults.baseURL,
        url: '/auth/register',
        message: err?.message,
        status: err?.response?.status,
        body: err?.response?.data,
      });
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('safedonate_user');
    localStorage.removeItem('safedonate_token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        setUser,
        // @ts-ignore extension — register is provided for signup flows
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
