/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/verify-auth', {
          method: 'GET',
          credentials: 'include'
        });

        const data = await response.json();
        
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Required for cross-origin requests with cookies
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      
      const authResponse = await fetch('http://localhost:3001/verify-auth', {
        method: 'GET',
        credentials: 'include',
      });
      
      const authData = await authResponse.json();
      
      if (authData.isAuthenticated) {
        setIsAuthenticated(true);
        setUser(authData.user);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:3001/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}