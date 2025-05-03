import { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const AuthGuard = () => {
  const { isLoggedIn, user } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
    user: state.user,
  }));

  useEffect(() => {
    if (!isLoggedIn || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isLoggedIn, user]);

  return null;
};

export default AuthGuard;
