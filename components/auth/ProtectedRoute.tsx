"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoutes?: string[];
}

const ProtectedRoute = ({ children, allowedRoutes = [] }: ProtectedRouteProps) => {
  const { user, loading, allowedRoutes: userRoutes } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    if (user && allowedRoutes.length > 0) {
      if (!allowedRoutes.some(route => userRoutes.includes(route))) {
        router.push('/unauthorized'); // Redirect to unauthorized page if user doesn't have access to the route
      }
    }
  }, [user, loading, allowedRoutes, userRoutes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;