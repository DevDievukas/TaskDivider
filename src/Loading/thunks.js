import * as actionTypes from './actions'

export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  }
}

export const createError = (error) => {
  return {
    type:  actionTypes.CREATE_ERROR,
    error: error,
  }
}

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  }
}

export const initiateLoading = () => {
  return dispatch => {   
    dispatch(startLoading())
    setTimeout(() => {
      dispatch(stopLoading())
    }, 10000)
  }
}
