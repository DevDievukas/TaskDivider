import axios                    from 'axios'
import {
  Formik,
  Form,
}								 	              from 'formik'
import {
  useDispatch,
}          				              from 'react-redux'
import {
  useHistory,
} 								              from 'react-router-dom'
import React 			              from 'react'

import { startRefreshToken } 	  from '../Auth/thunks'
import { closeForm }            from '../Form/thunks'
import {
  createErrorMessage,
  createSuccessMessage,
}                               from '../Modal/thunks'
import { transferSuccessfull }  from '../strings/success'
import Button 		              from '../shared/FormElements/Button'
import Input 			              from '../shared/FormElements/Input'

const ChangeOwner = ({ houseParam, token }) => {
  const dispatch = useDispatch()
  const history = useHistory()


  const changeOwnerHandler = (email) => {
    const reqData = {
      email,
      houseId: houseParam,
    }
    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/house/changeowner`,
      reqData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }).
      then((res) => {
        dispatch(closeForm())
        dispatch(createSuccessMessage(transferSuccessfull))
        dispatch(startRefreshToken(res.data.token))
        history.push('/')
      }).catch(() => {
        dispatch(createErrorMessage('Could not transfer ownership'))
      })
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={async ({ email }) => {
        changeOwnerHandler(email)
      }}
    >
      {() => (
        <Form>
          <Input id='email' name='email' type='input' title='E-MAIL' />
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
}

export default ChangeOwner