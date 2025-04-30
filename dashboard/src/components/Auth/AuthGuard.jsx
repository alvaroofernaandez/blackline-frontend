import { useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { navigate } from 'astro/virtual-modules/transitions-router.js';

const AuthGuard = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return null;
};

export default AuthGuard;
