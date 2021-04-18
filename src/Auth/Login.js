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
      .then(({ data :{ userId, token, email, remember }}) => {
        console.log(userId)
        dispatch(stopLoading())
        dispatch(
          startUserAuth(
            userId,
            token,
            email,
            remember,
          )
        )
      })
      .catch(({ response }) => {
        if (response) {
          dispatch(createError(response.data.message))
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
      .then(({ data: { houseId, houseName, remember, token}}) => {
        dispatch(stopLoading())
        dispatch(
          startHouseAuth(
            houseId,
            token,
            houseName,
            remember
          )
        )
      })
      .catch(({ response }) => {
        if (response) {
          dispatch(createError(response.data.message))
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
      onSubmit={async ({ email, houseName, password, remember }) => {
        if (isUserLogin) {
          userLogin(email, password, remember)
        } else {
          houseLogin(houseName, password, remember)
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