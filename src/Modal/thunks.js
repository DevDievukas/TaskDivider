import * as actionTypes from './actions'

export const createSuccessMessage = (message) => {
  return {
    type: actionTypes.SET_MESSAGE,
    message,
    messageType: 'success',
  }
}

export const createErrorMessage = (message) => {
  return {
    type: actionTypes.SET_MESSAGE,
    message,
    messageType: 'error',
  }
}

export const clearMessage = () => {
  return {
    type: actionTypes.CLEAR_MESSAGE,
  }
}