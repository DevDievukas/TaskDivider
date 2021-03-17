import {
  Formik,
  Field,
  Form
}                         from 'formik'
import { useDispatch }    from 'react-redux'
import React              from 'react'
import axios              from 'axios'

import { startUserAuth }  from './thunks'
import {
  startLoading,
  createError,
  stopLoading,
}                         from '../Loading/thunks'
import Button             from '../shared/FormElements/Button'
import Input              from '../shared/FormElements/Input'

import styles             from './Auth.module.css'

const LoginUser = () => {
  const dispatch = useDispatch()

  const login = (email, password, remember) => {
    dispatch(startLoading())
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password,
        remember,
      })
      .then((res) => {
        dispatch(stopLoading())
        dispatch(
          startUserAuth(
            res.data.userId,
            res.data.token,
            res.data.email,
            res.data.remember,
          )
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
        email: '',
        password: '',
        remember: false,
      }}
      onSubmit={async (values) => {
        login(values.email, values.password, values.remember)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id="email" name="email" type="email" title="EMAIL-ADRESS" />
          <Input
            id="password"
            name="password"
            type="password"
            title="PASSWORD"
          />
          <div className={styles.rememberDiv}>
            <label>
              <Field type="checkbox" name="remember" /> Remember me?
            </label>
          </div>
          <Button type="submit" className={styles.button}>
            LOGIN
          </Button>
        </Form>
      )}
    </Formik>
  )
}


export default LoginUser