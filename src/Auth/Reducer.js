import { updateObject } 	from '../Store/utility'

import * as actionTypes 	from './actions'

const initialState = {
  email:       null,
  expiration:  null,
  houseId:     null,
  houseName:   null,
  logoutTimer: null,
  token:       null,
  userId:      null,
}

const authHouse = (state, action) => {
  return updateObject(state, {
    token:      action.token,
    houseName:  action.houseName,
    houseId:    action.houseId,
    expiration: action.expiration,
  })
}

const authUser = (state, action) => {
  return updateObject(state, {
    userId:     action.userId,
    token:      action.token,
    email:      action.email,
    expiration: action.expiration,
  })
}

const clearTimer = (state) => {
  return updateObject(state, {
    logoutTimer: null,
  })
}

const logout = (state) => {
  return updateObject(state, initialState)
}

const refreshToken = (state, action) => {
  return updateObject(state, {
    token: action.token,
  })
}

const startTimer = (state, action) => {
  return updateObject(state, {
    logoutTimer: action.timer,
  })
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.AUTH_HOUSE:
    return authHouse(state, action)
  case actionTypes.AUTH_USER:
    return authUser(state, action)
  case actionTypes.CLEAR_TIMEOUT:
    return clearTimer(state)
  case actionTypes.AUTH_LOGOUT:
    return logout(state)
  case actionTypes.REFRESH_TOKEN:
    return refreshToken(state, action)
  case actionTypes.START_TIMER:
    return startTimer(state, action)
  default:
    return state
  }
}

export default authReducer
