/**
 * Route Guard Component
 * Protects routes based on permissions and roles
 */

import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCanAccess } from '@/hooks/usePermission';
import { useAuth } from '@/contexts/AuthContext';

interface RouteGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function RouteGuard({ children, redirectTo = '/unauthorized' }: RouteGuardProps) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const canAccess = useCanAccess(location.pathname);

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
