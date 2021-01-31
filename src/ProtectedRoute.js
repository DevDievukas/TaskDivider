import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Houses from './House/Houses';

const ProtectedRoute = ({ children, ...rest }) => {
  const token = useSelector((state) => state.token);
  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children || <Houses /> : <Auth />)}
    />
  );
};

export default ProtectedRoute;
