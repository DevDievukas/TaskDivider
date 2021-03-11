import { combineReducers } from 'redux'

import authReducer         from '../../Auth/Reducer'
import loadingReducer      from './loadingReducer'

export default combineReducers({
  auth:    authReducer,
  loading: loadingReducer,
})