import { useState, useCallback, useEffect } from 'react';
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [houseId, setHouseId] = useState(null);
  const [name, setName] = useState(null);

  const login = useCallback((id, token, name, userLogin, expirationDate) => {
    if (userLogin) {
      setToken(token);
      setUserId(id);
      setName(name);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: id,
          token: token,
          email: name,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    } else {
      setToken(token);
      setHouseId(id);
      setName(name);
      const tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'houseData',
        JSON.stringify({
          houseId: id,
          token: token,
          houseName: name,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setName(null);
    setHouseId(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('houseData');
  }, []);

  // useEffect(() => {
  //   if (token && tokenExpirationDate) {
  //     const remainingTime =
  //       tokenExpirationDate.getTime() - new Date().getTime();
  //     logoutTimer = setTimeout(logout, remainingTime);
  //   } else {
  //     clearTimeout(logoutTimer);
  //   }
  // }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    const storedHouseData = JSON.parse(localStorage.getItem('houseData'));
    if (
      storedUserData &&
      storedUserData.token &&
      new Date(storedUserData.expiration) > new Date()
    ) {
      login(
        storedUserData.userId,
        storedUserData.token,
        storedUserData.email,
        true,
        new Date(storedUserData.expiration)
      );
    } else if (
      storedHouseData &&
      storedHouseData.token &&
      new Date(storedHouseData.expiration) > new Date()
    ) {
      login(
        storedHouseData.houseId,
        storedHouseData.token,
        storedHouseData.houseName,
        false,
        new Date(storedHouseData.expiration)
      );
    }
  }, [login]);

  return { token, login, logout, userId, name, houseId };
};
