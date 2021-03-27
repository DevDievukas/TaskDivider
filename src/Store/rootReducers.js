import { combineReducers } from 'redux'

import authReducer         from '../Auth/Reducer'
import formReducer         from '../Form/reducer'
import houseReducer        from '../House/reducer'
import loadingReducer      from '../Loading/reducer'
import modalReducer        from '../Modal/reducer'

export default combineReducers({
  auth:    authReducer,
  loading: loadingReducer,
  house:   houseReducer,
  modal:   modalReducer,
  form:    formReducer,
})