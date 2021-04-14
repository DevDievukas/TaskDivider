import {
  Form,
  Formik,
}                        from 'formik'
import { useDispatch }   from 'react-redux'
import axios             from 'axios'
import React             from 'react'

import { startUserAuth } from './thunks'
import {
  startLoading,
  createError,
  stopLoading,
}                        from '../Loading/thunks'
import Button            from '../shared/FormElements/Button'
import Input             from '../shared/FormElements/Input'

import styles            from './Auth.module.css'

const SignUp = () => {
  const dispatch = useDispatch()

  const createUser = (name, email, password) => {
    dispatch(startLoading())
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        name,
        email,
        password,
        rememeber: false,
      })
      .then((res) => {
        dispatch(stopLoading())
        dispatch(
          startUserAuth(res.data.userId, res.data.token, res.data.email, false)
        )
      })
      .catch((error) => {
        if (error.response) {
          dispatch(createError(error.response.data.message))
        }
      })
  }

  return (
    <Formik
      initialValues={{
        name:     '',
        email:    '',
        password: '',
      }}
      onSubmit={async (values) => {
        createUser(values.name, values.email, values.password)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id="name" name="name" type="input" title="YOUR NAME" />
          <Input id="email" name="email" type="email" title="EMAIL-ADRESS" />
          <Input
            id="password"
            name="password"
            type="password"
            title="PASSWORD"
          />

          <Button type="submit" className={styles.button}>
            SIGN UP!
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUp
