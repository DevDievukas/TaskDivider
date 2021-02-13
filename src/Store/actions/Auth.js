import * as actionTypes from './actionTypes';

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const userAuth = (id, token, email, expiration) => {
  return {
    type: actionTypes.AUTH_USER,
    userId: id,
    token: token,
    email: email,
    expiration: expiration,
  };
};

export const houseAuth = (id, token, houseName, expiration) => {
  return {
    type: actionTypes.AUTH_HOUSE,
    houseId: id,
    token: token,
    houseName: houseName,
    expiration: expiration,
  };
};

export const startUserAuth = (id, token, email, remember, expiration) => {
  if (!remember) {
    return (dispatch) => {
      const tokenExpiration =
        expiration || new Date(new Date().getTime() + 1000 * 60);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: id,
          email: email,
          token: token,
          remember: remember,
          expiration: tokenExpiration.toISOString(),
        })
      );
      dispatch(userAuth(id, token, email, tokenExpiration));
    };
  } else {
    return (dispatch) => {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: id,
          email: email,
          token: token,
          remember: remember,
        })
      );
      dispatch(userAuth(id, token, email));
    };
  }
};

export const startHouseAuth = (id, token, houseName, remember, expiration) => {
  if (!remember) {
    return (dispatch) => {
      const tokenExpiration =
        expiration || new Date(new Date().getTime() + 1000 * 60);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          houseId: id,
          token: token,
          houseName: houseName,
          expiration: tokenExpiration.toISOString(),
          remember: remember,
        })
      );
      dispatch(houseAuth(id, token, houseName, tokenExpiration));
    };
  } else {
    return (dispatch) => {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          houseId: id,
          token: token,
          houseName: houseName,
          remember: remember,
        })
      );
      dispatch(houseAuth(id, token, houseName));
    };
  }
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('userData');
    dispatch(logout());
  };
};
