import { Navigate } from 'react-router-dom';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'admin' | 'user';
}

export default function RoleProtectedRoute({ children, requiredRole }: RoleProtectedRouteProps) {
  const userRole = localStorage.getItem('userRole') || 'user';
  
  if (requiredRole === 'admin' && userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}