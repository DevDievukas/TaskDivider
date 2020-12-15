import { createContext } from 'react';

export const AuthContext = createContext({
  userId: null,
  token: null,
  // email: null,
  login: () => {},
  logout: () => {},
});
