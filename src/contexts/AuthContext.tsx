import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<string, { user: User; token: string }> = {
  donor: {
    user: {
      id: '1',
      email: 'donor@example.com',
      name: 'John Donor',
      role: 'donor',
      avatar: 'https://i.pravatar.cc/150?u=donor',
    },
    token: 'mock-jwt-donor-token',
  },
  fundraiser: {
    user: {
      id: '2',
      email: 'fundraiser@example.com',
      name: 'Jane Fundraiser',
      role: 'fundraiser',
      avatar: 'https://i.pravatar.cc/150?u=fundraiser',
    },
    token: 'mock-jwt-fundraiser-token',
  },
  admin: {
    user: {
      id: '3',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?u=admin',
    },
    token: 'mock-jwt-admin-token',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('safedonate_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('safedonate_token'));

  const login = useCallback(async (email: string, _password: string, role?: UserRole) => {
    await new Promise((r) => setTimeout(r, 500));
    const key = role || (email.includes('admin') ? 'admin' : email.includes('fundraiser') ? 'fundraiser' : 'donor');
    const { user: u, token: t } = MOCK_USERS[key] || MOCK_USERS.donor;
    setUser(u);
    setToken(t);
    localStorage.setItem('safedonate_user', JSON.stringify(u));
    localStorage.setItem('safedonate_token', t);
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
