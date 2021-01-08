import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Auth from './Auth/Auth';
import Houses from './House/Houses';

import { AuthContext } from './shared/Context/auth-context';
const ProtectedRoute = ({ children, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children || <Houses /> : <Auth />)}
    />
  );
};

export default ProtectedRoute;
