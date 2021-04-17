import { updateObject } from '../Store/utility'

import * as actionTypes from './actions'

const initialState = {
  isLoading: false,
  error:     null,
}

const startLoading = (state) => {
  return updateObject(state, {
    isLoading: true,
  })
}

const stopLoading = (state) => {
  return updateObject(state, initialState)
}

const createError = (state, action) => {
  return updateObject(state, {
    isLoading: false,
    error:     action.error,
  })
}

const clearError = (state) => {
  return updateObject(state, initialState)
}

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.START_LOADING:
    return startLoading(state)
  case actionTypes.STOP_LOADING:
    return stopLoading(state)
  case actionTypes.CREATE_ERROR:
    return createError(state, action)
  case actionTypes.CLEAR_ERROR:
    return clearError(state)
  default:
    return state
  }
}

export default loadingReducer
