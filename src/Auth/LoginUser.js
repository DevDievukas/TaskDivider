import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import {
  startLoading,
  createError,
  stopLoading,
} from '../Store/actions/Loading';
import { startUserAuth } from '../Store/actions/Auth';

import Button from '../shared/FormElements/Button';
import styles from './Auth.module.css';

const LoginUser = () => {
  const dispatch = useDispatch();

  const login = (email, password, remember) => {
    dispatch(startLoading());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        email,
        password,
        remember,
      })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(
          startUserAuth(
            res.data.userId,
            res.data.token,
            res.data.email,
            res.data.remember
          )
        );
      })
      .catch((error) => {
        if (error.response) {
          dispatch(createError(error.response.data.message));
        }
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
      }}
      onSubmit={async (values) => {
        console.log(values);
        login(values.email, values.password, values.remember);
      }}
    >
      {({}) => (
        <Form className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="email" name="email" type="email" />
              <label htmlFor="email">EMAIL-ADRESS</label>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="password" name="password" type="password" />
              <label htmlFor="password">PASSWORD</label>
            </div>
          </div>
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
  );
};

export default LoginUser;
