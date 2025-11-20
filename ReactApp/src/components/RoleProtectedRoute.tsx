import { Navigate } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user';
}

export default function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();
  
  if (requiredRole === 'admin' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}