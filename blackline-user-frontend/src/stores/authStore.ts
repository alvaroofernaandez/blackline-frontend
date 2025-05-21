import { create } from 'zustand';

type User = {
  id: number;
  username: string;
  email: string;
  role: string;
  instagram_username: string | null;
  can_receive_emails: boolean | null;
  [key: string]: any;
};

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  getAvatarUrl: () => string;
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
      instagram_username: null,
      can_receive_emails: null,
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

const fetchUserDetailsById = async (id: number, token: string) => {
  try {
    const res = await fetch(`http://localhost:8000/api/usuario_por_id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('No se pudo obtener el usuario');

    const json = await res.json();
    const currentUser = json.usuario;

    useAuthStore.setState((state: AuthState) => {
      if (!state.user) return {};
      return {
        user: {
          ...state.user,
          instagram_username: currentUser.instagram_username,
          can_receive_emails: currentUser.can_receive_emails,
        },
      };
    });    
  } catch (error) {
    console.log('Error fetching user details:', error);
  }
};

export const useAuthStore: any = create<AuthState>((set) => {
  const token = getCookie('accessToken');
  const isLoggedIn = token ? isTokenValid(token) : false;
  const user = isLoggedIn && token ? decodeToken(token) : null;

  if (isLoggedIn && token && user) {
    fetchUserDetailsById(user.id, token);
  }

  return {
    isLoggedIn,
    token: isLoggedIn ? token : null,
    user,
    login: async (token: string) => {
      const decodedUser = decodeToken(token);
      if (!decodedUser) return;

      setCookie('accessToken', token, 7);
      set({ isLoggedIn: true, token, user: decodedUser });

      await fetchUserDetailsById(decodedUser.id, token);
    },
    logout: () => {
      removeCookie('accessToken');
      set({ isLoggedIn: false, token: null, user: null });
    },
    getAvatarUrl: () => {
      const currentUser = useAuthStore.getState().user;
      const name = currentUser?.username || 'U';
      return `https://ui-avatars.com/api/?name=${name}&background=4b5563&color=fff&size=128`;
    }
  };
});