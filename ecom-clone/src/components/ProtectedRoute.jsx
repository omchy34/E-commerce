import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { validateAuth } from "../utils/validateAuth.js"; // Adjust path as needed

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  
  // Check authentication when component mounts
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      dispatch(validateAuth());
    }
  }, [dispatch, isAuthenticated, loading]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;