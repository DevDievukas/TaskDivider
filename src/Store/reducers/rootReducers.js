import { combineReducers } from 'redux'

import authReducer         from './authReducer'
import loadingReducer      from './loadingReducer'

export default combineReducers(
  authReducer,
  loadingReducer,
)