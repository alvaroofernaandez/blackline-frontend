import { create } from 'zustand';

type User = {
  username: string;
  email: string;
  role: string;
  instagram_username: string | null;
  [key: string]: any; 
};

type AuthState = {
[x: string]: any;
  isHydrated: boolean;
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  hydrate: () => void;
};

const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch {
    return false;
  }
};

const decodeToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      instagram_username: payload.instagram_username,
    };
  } catch {
    return null;
  }
};

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days: number): void => {
  if (typeof document === 'undefined') return;
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
};

const removeCookie = (name: string): void => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

export const useAuthStore = create<AuthState>((set) => ({
  isHydrated: false,
  isLoggedIn: false,
  token: null,
  user: null,

  login: (token: string) => {
    const decodedUser = decodeToken(token);
    setCookie('accessToken', token, 7);
    set({ isLoggedIn: true, token, user: decodedUser });
  },

  logout: () => {
    removeCookie('accessToken');
    set({ isLoggedIn: false, token: null, user: null });
  },

  hydrate: () => {
    const token = getCookie('accessToken');
    const valid = token && isTokenValid(token);
    const user = valid ? decodeToken(token) : null;
    set({
      isHydrated: true,
      isLoggedIn: Boolean(valid),
      token: valid ? token : null,
      user,
    });
  },
}));
