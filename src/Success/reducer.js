import { updateObject } from '../Store/utility'

import * as actionTypes from './actions'

const initialState = {
  message: null,
}

const createMessage = (state, action) => {
  return updateObject(state, {
    message: action.message
  })
}

const clearMessage = (state) => {
  return updateObject(state, initialState)
}

const successReducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.SET_MESSAGE:
    return(createMessage(state, action))
  case actionTypes.CLEAR_MESSAGE:
    return(clearMessage(state))
  default:
    return state
  }
}

export default successReducer