import axios               from 'axios'

import { setHouseHandler } from '../House/thunks'

import {
  clearLogoutTimer,
  houseAuth,
  logout,
  startLogoutTimer,
  refreshToken,
  userAuth,
}                          from './actions'


export const startRefreshToken = (token) => {
  return (dispatch) => {
    const {
      email,
      expiration,
      remember,
      userId,
    } = JSON.parse(localStorage.getItem('userData'))
    if (email) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId,
          email,
          token,
          remember,
          expiration,
        })
      )
      dispatch(refreshToken(token))
    }
  }
}

export const startUserAuth = (id, token, email, remember, expiration) => {
  return dispatch => {
    let tokenExpiration;
  
    if(!remember) {
      tokenExpiration =
      expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
    }
  
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId:     id,
        email:      email,
        token:      token,
        remember:   remember,
        expiration: tokenExpiration ? tokenExpiration.toISOString() : null,
      })
    )
    dispatch(initiateLogoutTimer(tokenExpiration))
    dispatch(userAuth(
      id,
      token,
      email,
      tokenExpiration
    ))
  }
}

export const startHouseAuth = (id, token, houseName, remember, expiration) => {
  return dispatch => {
    let tokenExpiration

    if(!remember) {
      tokenExpiration =
				expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
    }
    localStorage.setItem(
      'userData',
      JSON.stringify({
        houseId:    id,
        token:      token,
        houseName:  houseName,
        expiration: tokenExpiration ? tokenExpiration.toISOString() : null,
        remember:   remember,
      })
    )

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/house/${id}`)
      .then(res => {
        dispatch(setHouseHandler(res.data))
      }).catch(error => {
        console.log(error)
      })
    dispatch(houseAuth(id, token, houseName, tokenExpiration))
    dispatch(initiateLogoutTimer(tokenExpiration))
  }
}

export const startLogout = () => {
  return (dispatch) => {
    localStorage.removeItem('userData')
    dispatch(logout())
  }
}

export const authFromLocalStorage = () => {
  const {
    expiration,
    houseId,
    houseName,
    userId,
    token,
    email,
    remember,
  } = JSON.parse(localStorage.getItem('userData'))
  // const storedUserData = JSON.parse(localStorage.getItem('userData'))
  return dispatch => {
    if (token) {
      if (expiration && new Date(expiration) < new Date()) { 
        dispatch(startLogout())
        return
      }
      if (userId) {
        dispatch(
          startUserAuth(
            userId,
            token,
            email,
            remember,
            expiration ?
              new Date(expiration) :
              null
          )
        )
      } else if (houseId) {
        dispatch(
          startHouseAuth(
            houseId,
            token,
            houseName,
            remember,
            expiration ?
              new Date(expiration) :
              null
          )
        )
      }
    }
  }
}

const initiateLogoutTimer = (expirationDate) => {
  if (expirationDate) {
    return dispatch => {
      const remainingTime = expirationDate.getTime() - new Date().getTime()
      const countDown = (
        setTimeout(() => dispatch(startLogout()),remainingTime)
      )
      dispatch(startLogoutTimer(countDown))
    }
  } else {
    return dispatch => dispatch(clearLogoutTimer())
  }
}