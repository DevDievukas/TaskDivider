import {
  connect,
  useDispatch,
}                         from 'react-redux'
import React              from 'react'
import ReactDOM           from 'react-dom'

import Backdrop           from '../shared/UIElements/Backdrop'

import { closeForm }      from './thunks'
import * as styled        from './styled'

const ModalOverlay = (props) => {

  const content = (
    <styled.Modal>
      <styled.Header>
        <h4>{props.title}</h4>
      </styled.Header>
      {props.form}
    </styled.Modal>
  )
  return ReactDOM.createPortal(
    content,
    document.getElementById('formModal-hook')
  )
}

export default connect (( { form: { form, isFormValid, formTitle } }) => (
  {form, isFormValid, formTitle}))(
  ({ form, isFormValid, formTitle }) => {
    const dispatch = useDispatch()

    const closeFormModal = () => {
      dispatch(closeForm())
    }

    return (
      form ?
        <React.Fragment>
          <Backdrop onClick={closeFormModal} />
          <ModalOverlay clear={closeFormModal} form={form} title={formTitle} isFormValid={isFormValid}/>
        </React.Fragment> :
        null
    )
  }
)
