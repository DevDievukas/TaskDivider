import {
  connect,
  useDispatch,
}                         from 'react-redux'
import React              from 'react'
import ReactDOM           from 'react-dom'

import Backdrop           from '../shared/UIElements/Backdrop'

import * as styled        from './styled'
import { clearMessage }   from './thunks'

const ModalOverlay = (props) => {
  const { clear, error, message } = props

  const content = (
    <styled.Modal error={error === 'error'}>
      <styled.Message>{message}</styled.Message>
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

export default connect (({ modal: { message, messageType }}) => (
  { message, messageType }))(
  ({ message, messageType }) => {
    const dispatch = useDispatch()

    const clearSuccessMessage = () => {
      dispatch(clearMessage())
    }

    return ( 
      message ?
        <React.Fragment>
          <Backdrop onClick={clearSuccessMessage} />
          <ModalOverlay
            clear={clearSuccessMessage}
            message={message}
            error={messageType}
          />
        </React.Fragment> : 
        null
    )
  }
)