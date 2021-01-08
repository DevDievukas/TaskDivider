import { createContext } from 'react';

export const AuthContext = createContext({
  userId: null,
  houseName: null,
  houseId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
