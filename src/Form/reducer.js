import { updateObject } from '../Store/utility'

import * as actionTypes from './actions'

const initialState = {
  form:        null,
  formIsValid: null,
  formTitle:   null,
}

const createForm = (state, action) => {
  return updateObject(state, {
    form:      action.form,
    formTitle: action.title,
  })
}

const closeForm = (state) => {
  return updateObject(state, initialState)
}

const setFormInvalid = (state) => {
  return updateObject(state, {
    formIsValid: false,
  })
}

const formReducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.SET_FORM:
    return createForm(state, action)
  case actionTypes.CLOSE_FORM:
    return closeForm(state)
  case actionTypes.SET_FORM_INVALID:
    return setFormInvalid(state)
  default:
    return state
  }
}

export default formReducer