import {
  Formik,
  Form,
}								 	         from 'formik'              
import { 
  useDispatch,
}                          from 'react-redux'
import React 			         from 'react'

import { closeForm }       from '../Form/thunks'
import { createError }     from '../Loading/thunks'
import {
  createSuccessMessage,
}                          from '../Modal/thunks'
import { changedPassword } from '../strings/success'
import usePostData 	       from '../shared/hooks/postData-hook'
import Button 		         from '../shared/FormElements/Button'
import Input 			         from '../shared/FormElements/Input'

const ChangePassword = ({ houseParam, token }) => {
  const { post } = usePostData()
  const dispatch = useDispatch()

  const changePasswordHandler = (oldPassword, newPassword) => {
    const reqData = {
      houseId: houseParam,
      oldPassword,
      newPassword,
    }

    post(
      `${process.env.REACT_APP_BACKEND_URL}/house/changepassword/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      reqData,
      () => {
        dispatch(createSuccessMessage(changedPassword))
        dispatch(closeForm())
      }
    )
  }

  const comparePasswords = (oldPass, newPass, newPasswordRepeat, resetForm) => {
    if(oldPass === newPass) {
      dispatch(createError('new password cant be same as old password'))
      resetForm({ values: '' })
      return
    }
    if(newPass !== newPasswordRepeat) {
      dispatch(createError('New passwords does not match'))
      resetForm({ values: '' })
      return
    }
    changePasswordHandler(oldPass, newPass)
  }

  return (
    <Formik
      initialValues={{
        oldPassword:       '',
        newPassword:       '',
        newPasswordRepeat: '',
      }}
      onSubmit={(values, { resetForm }) => {
        comparePasswords(
          values.oldPassword,
          values.newPassword,
          values.newPasswordRepeat,
          resetForm
        )
      }}
    >
      {() => (
        <Form>
          <Input
            id='oldPassword'
            name='oldPassword'
            type='password'
            title='OLD PASSWORD'
          />
          <Input
            id='newPassword'
            name='newPassword'
            type='password'
            title='NEW PASSWORD'
          />
          <Input
            id='newPasswordRepeat'
            name='newPasswordRepeat'
            type='password'
            title='REPEAT NEW PASSWORD'
          />
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
}

export default ChangePassword