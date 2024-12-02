// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get('AccessToken');

  if (!accessToken) {
    // If the access token doesn't exist, redirect to the login page
    return <Navigate to="/Login" />
  }

  // Otherwise, render the child components (protected routes)
  return children;
};

export default ProtectedRoute;
