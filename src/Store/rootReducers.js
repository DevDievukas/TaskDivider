import { combineReducers } from 'redux'

import authReducer         from '../Auth/Reducer'
import formReducer         from '../Form/reducer'
import loadingReducer      from '../Loading/reducer'
import modalReducer        from '../Modal/reducer'

export default combineReducers({
  auth:    authReducer,
  loading: loadingReducer,
  modal:   modalReducer,
  form:    formReducer,
})