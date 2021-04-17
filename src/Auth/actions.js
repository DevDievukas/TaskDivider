export const AUTH_HOUSE = 'AUTH_HOUSE'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_USER = 'AUTH_USER'
export const CLEAR_TIMEOUT = 'CLEAR_TIMEOUT'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const START_TIMER = 'START_TIMER'



export const clearLogoutTimer = () => {
  return {
    type: CLEAR_TIMEOUT,
  }
}

export const houseAuth = (id, token, houseName, expiration) => {
  return {
    type:       AUTH_HOUSE,
    houseId:    id,
    token:      token,
    houseName:  houseName,
    expiration: expiration,
  }
}

export const logout = () => {
  return {
    type: AUTH_LOGOUT,
  }
}

export const startLogoutTimer = (timer) => {
  return {
    type:  START_TIMER,
    timer: timer,
  }
}

export const refreshToken = (token) => {
  return {
    type:  REFRESH_TOKEN,
    token: token,
  }
}

export const userAuth = (id, token, email, expiration) => {
  return {
    type:       AUTH_USER,
    userId:     id,
    token:      token,
    email:      email,
    expiration: expiration,
  }
}