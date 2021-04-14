import * as actionTypes from './actions'

export const createForm = (form, title) => {
  return {
    type: actionTypes.SET_FORM,
    form,
    title,
  }
}

export const closeForm = () => {
  return {
    type: actionTypes.CLOSE_FORM,
  }
}

export const setFormInvalid = () => {
  return {
    type: actionTypes.SET_FORM_INVALID,
  }
}