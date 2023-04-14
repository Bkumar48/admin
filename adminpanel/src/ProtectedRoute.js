import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    window.onpopstate = () => {
      if (!isAuthenticated && window.location.pathname !== '/login') {
        alert('You must be logged in to access this page');
        window.history.pushState(null, '', '/login');
      }
    };
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />}
    />
  );
};

export default ProtectedRoute;