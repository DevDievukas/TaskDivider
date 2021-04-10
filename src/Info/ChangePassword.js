import {
  Formik,
  Form
}								 	      from 'formik'              
import { 
  useDispatch,
}                       from 'react-redux'
import {
  useParams,
}                       from 'react-router-dom'
import React 			      from 'react'

import { createError }  from '../Loading/thunks'
import usePostData 	    from '../shared/hooks/postData-hook'
import Button 		      from '../shared/FormElements/Button'
import Input 			      from '../shared/FormElements/Input'
import FormModal 	      from '../shared/UIElements/FormModal/FormModal'

const ChangePassword = (props) => {
  const { post } = usePostData()
  const houseParam = useParams().houseId
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
          authorization: `Bearer ${props.token}`,
        },
      },
      reqData,
      () => {
        props.cancel()
      }
    )
  }

  const comparePasswords = (oldPassword, newPassword, newPasswordRepeat, resetForm) => {
    if(oldPassword === newPassword) {
      dispatch(createError('new password cant be same as old password'))
      resetForm({ values: '' })
      return
    }
    if(newPassword !== newPasswordRepeat) {
      dispatch(createError('New passwords does not match'))
      resetForm({ values: '' })
      return
    }
    changePasswordHandler(oldPassword, newPassword)
  }

  const form = (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        newPasswordRepeat: '',
      }}
      onSubmit={(values, { resetForm }) => {
        comparePasswords(values.oldPassword, values.newPassword, values.newPasswordRepeat, resetForm)
      }}
    >
      {() => (
        <Form>
          <Input id='oldPassword' name='oldPassword' type='password' title='OLD PASSWORD' />
          <Input id='newPassword' name='newPassword' type='password' title='NEW PASSWORD' />
          <Input id='newPasswordRepeat' name='newPasswordRepeat' type='password' title='REPEAT NEW PASSWORD' />
          <Button type='button' cancel onClick={props.cancel}>
						CANCEL
          </Button>
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
  
  return (
    <FormModal
      onCancel={props.cancel}
      header='CHANGE HOUSE PASSWORD?'
      show={props.show}
      form={form}
    />
  )
}

export default ChangePassword