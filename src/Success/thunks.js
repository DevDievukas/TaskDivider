import * as actionTypes from './actions'

export const createMessage = (message) => {
  return {
    type: actionTypes.SET_MESSAGE,
    message,
  }
}

export const clearMessage = () => {
  return {
    type: actionTypes.CLEAR_MESSAGE
  }
}