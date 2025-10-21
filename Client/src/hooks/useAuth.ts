'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie, deleteCookie } from '@/lib/cookies';
import { UserRole } from '@/types/auth';

interface User {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
}

const getInitialAuthState = () => {
  if (typeof window === 'undefined') return { user: null, loading: true };
  
  const token = getCookie('token');
  const userId = getCookie('userId');
  const userRole = getCookie('userRole') as UserRole;

  if (token && userId && userRole) {
    return {
      user: {
        id: userId,
        email: '',
        role: userRole,
        isVerified: true
      },
      loading: false
    };
  }
  
  return { user: null, loading: false };
};

export const useAuth = () => {
  const initialState = getInitialAuthState();
  const [user, setUser] = useState<User | null>(initialState.user);
  const [loading, setLoading] = useState(initialState.loading);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const token = getCookie('token');
    const userId = getCookie('userId');
    const userRole = getCookie('userRole') as UserRole;

    if (token && userId && userRole) {
      setUser({
        id: userId,
        email: '',
        role: userRole,
        isVerified: true
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    deleteCookie('token');
    deleteCookie('userId');
    deleteCookie('userRole');
    setUser(null);
    router.push('/login');
  };

  const isAuthenticated = !!user;
  const hasRole = (roles: UserRole[]) => user && roles.includes(user.role);

  return {
    user,
    loading,
    isAuthenticated,
    hasRole,
    logout
  };
};