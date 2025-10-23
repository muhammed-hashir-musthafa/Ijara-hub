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
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;

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

      if (routeRoles && user && user.role && !routeRoles.includes(user.role as UserRole)) {
        router.replace('/');
        return;
      }
    }

    setIsAuthorized(true);
  }, [user, isLoading, isAuthenticated, pathname, router, allowedRoles, requireAuth]);

  if (isLoading || !isAuthorized) {
    return <AuthLoader />;
  }

  return <>{children}</>;
};