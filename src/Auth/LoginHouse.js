import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';

import {
  startLoading,
  createError,
  stopLoading,
} from '../Store/actions/Loading';
import { startHouseAuth } from '../Store/actions/Auth';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import styles from './Auth.module.css';

const LoginHouse = () => {
  const dispatch = useDispatch();

  const login = (houseName, password, remember) => {
    dispatch(startLoading());
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/house/login`, {
        houseName,
        password,
        remember,
      })
      .then((res) => {
        dispatch(stopLoading());
        dispatch(
          startHouseAuth(
            res.data.houseId,
            res.data.token,
            res.data.houseName,
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
        houseName: '',
        password: '',
        remember: false,
      }}
      onSubmit={async (values) => {
        login(values.houseName, values.password, values.remember);
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input
            id="houseName"
            name="houseName"
            type="input"
            title="NAME OF THE HOUSE"
          />
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
  );
};

export default LoginHouse;
