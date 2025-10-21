'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/auth';
import { AuthLoader } from './AuthLoader';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  requireAuth?: boolean;
}

const protectedRoutes = {
  '/admin': ['admin'] as UserRole[],
  '/owner': ['owner', 'admin'] as UserRole[],
  '/profile': ['renter', 'owner', 'admin'] as UserRole[],
  '/messages': ['renter', 'owner', 'admin'] as UserRole[],
};

export const RouteGuard = ({ children, allowedRoles, requireAuth = true }: RouteGuardProps) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (loading) return;

    // Check if current route is protected
    const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
      pathname.startsWith(route)
    );

    if (isProtectedRoute || requireAuth) {
      if (!isAuthenticated) {
        router.replace('/login');
        return;
      }

      // Check role-based access
      const routeRoles = allowedRoles || Object.entries(protectedRoutes)
        .find(([route]) => pathname.startsWith(route))?.[1];

      if (routeRoles && user && !routeRoles.includes(user.role)) {
        router.replace('/');
        return;
      }
    }

    setIsAuthorized(true);
  }, [user, loading, isAuthenticated, pathname, router, allowedRoles, requireAuth]);

  if (loading || !isAuthorized) {
    return <AuthLoader />;
  }

  return <>{children}</>;
};