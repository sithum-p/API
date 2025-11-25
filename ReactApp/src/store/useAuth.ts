import { create } from "zustand";

const encryptData = (data: any): string => {
  return JSON.stringify(data); // Store as plain JSON
};

const decryptData = (encryptedData: string): any => {
  try {
    return JSON.parse(encryptedData);
  } catch {
    return null;
  }
};

const setAuthCookie = (token: string) => {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `auth=${token}; expires=${expires}; path=/; secure; samesite=strict`;
};

const getAuthCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; auth=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
};

const deleteAuthCookie = () => {
  // Delete cookie with different path variations to ensure removal
  document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
  document.cookie = `auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

const getUserRoleFromToken = (): string => {
  const token = getAuthCookie();
  if (!token) return 'user';
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || 'user';
  } catch {
    return 'user';
  }
};

const getUserNameFromToken = (): string => {
  const token = getAuthCookie();
  if (!token) return 'User';
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.name || payload.email || 'User';
  } catch {
    return 'User';
  }
};

interface AuthState {
  token: string | null;
  user: any | null;
  tokenExpiry: number | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
  checkTokenExpiry: () => void;
  getUserRole: () => string;
  getUserName: () => string;
}

export const useAuth = create<AuthState>()((set, get) => {
  const token = getAuthCookie();
  let initialUser = null;
  let initialExpiry = null;
  
  // Initialize user data from token if available
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      initialUser = {
        id: payload.userId,
        email: payload.email,
        name: payload.name || payload.email,
        role: payload.role || 'user'
      };
      initialExpiry = payload.exp * 1000; // Convert to milliseconds
    } catch {
      // Invalid token, will be handled by isAuthenticated
    }
  }
  
  return {
    token: token,
    user: initialUser,
    tokenExpiry: initialExpiry,
    
    login: async (email: string, password: string) => {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }
      
      const data = await response.json();
      const expiry = Date.now() + (24 * 60 * 60 * 1000);
      
      setAuthCookie(data.token);
      set({ token: data.token, user: data.user, tokenExpiry: expiry });
    },
    
    logout: () => {
      deleteAuthCookie();
      set({ token: null, user: null, tokenExpiry: null });
      // Force reload to clear any cached data
      setTimeout(() => window.location.reload(), 100);
    },
    
    isAuthenticated: () => {
      const token = getAuthCookie();
      if (!token) return false;
      
      try {
        // Decode JWT to check expiry
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        
        if (payload.exp && payload.exp < currentTime) {
          get().logout();
          return false;
        }
        
        return true;
      } catch {
        get().logout();
        return false;
      }
    },
    
    checkTokenExpiry: () => {
      const { tokenExpiry } = get();
      if (tokenExpiry && Date.now() > tokenExpiry) {
        get().logout();
      }
    },
    
    getUserRole: () => {
      return getUserRoleFromToken();
    },
    
    getUserName: () => {
      return getUserNameFromToken();
    }
  };
});