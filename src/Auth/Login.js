import {
  Formik,
  Field,
  Form,
}                         from 'formik'
import { useDispatch }    from 'react-redux'
import React              from 'react'
import axios              from 'axios'

import {
  startLoading,
  createError,
  stopLoading,
}                         from '../Loading/thunks'
import Button             from '../shared/FormElements/Button'
import Input              from '../shared/FormElements/Input'

import {
  startUserAuth,
  startHouseAuth,
}                         from './thunks'
import styles             from './Auth.module.css'

const Login = (props) => {
  const { isUserLogin } = props
  const dispatch = useDispatch()

  const userLogin = (email, password, remember) => {
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

  const houseLogin = (houseName, password, remember) => {
    dispatch(startLoading())
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/house/login`, {
        houseName,
        password,
        remember,
      })
      .then((res) => {
        dispatch(stopLoading())
        dispatch(
          startHouseAuth(
            res.data.houseId,
            res.data.token,
            res.data.houseName,
            res.data.remember
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
        email:     '',
        houseName: '',
        password:  '',
        remember:  false,
      }}
      onSubmit={async (values) => {
        if (isUserLogin) {
          userLogin(values.email, values.password, values.remember)
        } else {
          houseLogin(values.houseName, values.password, values.remember)
        }
      }}
    >
      {() => (
        <Form className={styles.form}>
          { isUserLogin ? 
            <Input
              id="email"
              name="email"
              type="email"
              title="EMAIL-ADRESS"
            /> :
            <Input
              id="houseName"
              name="houseName"
              type="input"
              title="NAME OF THE HOUSE"
            />
          }
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


export default Login