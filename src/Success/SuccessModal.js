import {
  useDispatch,
  useSelector
}                         from 'react-redux'
import React              from 'react'
import ReactDOM           from 'react-dom'

import Backdrop           from '../shared/UIElements/Backdrop'

import * as styled        from './styled'
import { clearMessage }   from './thunks'

const ModalOverlay = (props) => {
  const { clear, message } = props

  const content = (
    <styled.Modal>
      <h2>{message}</h2>
      <styled.okButton onClick={() => clear()}>
      ✓
      </styled.okButton>
    </styled.Modal>
  )
  return ReactDOM.createPortal(
    content,
    document.getElementById('formModal-hook')
  )
}

export default () => {
  const { message } = useSelector(state => ({ ...state.success }))
  const dispatch = useDispatch()

  const clearSuccessMessage = () => {
    dispatch(clearMessage())
  }

  return (
    <React.Fragment>
      {!!message && <Backdrop onClick={clearSuccessMessage} />}
      {!!message && <ModalOverlay clear={clearSuccessMessage} message={message}/>}
    </React.Fragment>
  )
}

