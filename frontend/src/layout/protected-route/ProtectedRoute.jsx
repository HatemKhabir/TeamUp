// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const auth = useContext(AuthContext);
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1-second delay

    return () => clearTimeout(timer); 
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return auth.isAuth ? children : <Navigate to="/auth" replace />;
};


export default ProtectedRoute;