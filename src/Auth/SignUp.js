import React from 'react';
import axios from 'axios';
import { Form, Field, Formik } from 'formik';

import { useDispatch } from 'react-redux';
import {
  startLoading,
  createError,
  stopLoading,
} from '../Store/actions/Loading';
import { startUserAuth } from '../Store/actions/Auth';

import Button from '../shared/FormElements/Button';
import styles from './Auth.module.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const createUser = (name, email, password) => {
    dispatch(startLoading());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
        name,
        email,
        password,
        rememeber: false,
      })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(
          startUserAuth(res.data.userId, res.data.token, res.data.email, false)
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
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={async (values) => {
        createUser(values.name, values.email, values.password);
      }}
    >
      {({}) => (
        <Form className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="name" name="name" type="input" />
              <label htmlFor="name">NAME</label>
            </div>
          </div>
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
          <Button type="submit" className={styles.button}>
            SIGN UP!
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
