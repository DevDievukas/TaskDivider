import { combineReducers } from 'redux'

import authReducer         from '../../Auth/Reducer'
import loadingReducer      from '../../Loading/reducer'

export default combineReducers({
  auth:    authReducer,
  loading: loadingReducer,
})