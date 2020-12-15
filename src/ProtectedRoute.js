import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import Main from './Main/Main';

import { AuthContext } from './shared/Context/auth-context';
const ProtectedRoute = ({ children, ...rest }) => {
  const { token } = useContext(AuthContext);
  return (
    <Route {...rest} render={({ location }) => (token ? children : <Main />)} />
  );
};

export default ProtectedRoute;
