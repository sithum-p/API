import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";

export default function AuthChecker({ children }: { children: React.ReactNode }) {
  const { checkTokenExpiry, logout, token } = useAuth();

  useEffect(() => {
    checkTokenExpiry();

    const interval = setInterval(() => {
      checkTokenExpiry();
      
      // Check if auth cookie was deleted manually
      const authCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('auth='));
      
      const currentPath = window.location.pathname;
      
      // Check if cookie exists and is valid JWT
      let cookieValid = false;
      if (authCookie) {
        const cookieValue = authCookie.split('=')[1];
        cookieValid = cookieValue && cookieValue.split('.').length === 3;
      }
      
      if ((!authCookie || !cookieValid) && token && currentPath !== '/login' && currentPath !== '/signin') {
        logout();
        window.location.href = '/login';
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [checkTokenExpiry, logout, token]);

  return <>{children}</>;
}