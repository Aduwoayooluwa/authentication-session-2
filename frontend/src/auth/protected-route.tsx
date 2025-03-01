import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/auth-context'

interface ProtectedRouteProps {
  redirectPath?: string
}

export default function ProtectedRoute({
  redirectPath = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
 
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}