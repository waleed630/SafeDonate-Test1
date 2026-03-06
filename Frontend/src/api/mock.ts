import type { UserRole } from '../types';

export const mockDelay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export const mockLogin = async (email: string, _password: string, role?: UserRole) => {
  await mockDelay(500);
  return {
    user: {
      id: '1',
      email,
      name: email.split('@')[0],
      role: role || 'donor',
    },
    token: `mock-jwt-${Date.now()}`,
  };
};
