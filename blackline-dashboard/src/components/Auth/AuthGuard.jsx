import { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const AuthGuard = () => {
  const { isLoggedIn, user, hydrate, isHydrated } = useAuthStore();

  useEffect(() => {
    hydrate(); 
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isLoggedIn || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isHydrated, isLoggedIn, user]);

  return null;
};

export default AuthGuard;
