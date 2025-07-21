// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { showToast } from '../utils/toast.tsx';

interface User {
  email: string;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      const userEmail = localStorage.getItem('userEmail');

      if (isAuthenticated && userEmail) {
        setUser({
          email: userEmail,
          isAuthenticated: true,
        });
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (email: string) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    setUser({
      email,
      isAuthenticated: true,
    });
    showToast('로그인에 성공했습니다.', 'success');
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setUser(null);
    showToast('로그아웃되었습니다.', 'success');
  };

  return {
    user,
    isLoading,
    isAuthenticated: user?.isAuthenticated || false,
    login,
    logout,
  };
};
