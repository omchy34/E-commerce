import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get('AccessToken');
  
  if (!accessToken) {
    return <Navigate to="/Login" />;
  }else{

    return children;
  }

  
};

export default ProtectedRoute;
