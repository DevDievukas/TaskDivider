import { combineReducers } from 'redux'

import authReducer         from '../Auth/Reducer'
import loadingReducer      from '../Loading/reducer'
import successReducer      from '../Success/reducer'

export default combineReducers({
  auth:    authReducer,
  loading: loadingReducer,
  success: successReducer,
})