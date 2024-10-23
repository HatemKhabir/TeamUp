// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { userAuth,isAuth } = useContext(AuthContext);
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;