import React, { useState } from 'react';
import { useHistory } from 'react-router';

import Input from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import Login from './Login';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../shared/validators/validators';

import styles from './Auth.module.css';
import { startHouseAuth, startUserAuth } from '../Store/actions/Auth';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [houseLogin, setHouseLogin] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      houseName: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      // remember: {
      //   value: false,
      //   isValid: true,
      // },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    dispatch(startLoading());
    event.preventDefault();
    if (isLoginMode && !houseLogin) {
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(stopLoading());
            dispatch(
              startUserAuth(res.data.userId, res.data.token, res.data.email)
            );
            history.push('/');
          })
          .catch((error) => {
            if (error.response) {
              dispatch(createError(error.response.data.message));
            }
          });
      } catch (err) {}
    } else if (!isLoginMode && !houseLogin) {
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(stopLoading());
            dispatch(
              startUserAuth(res.data.userId, res.data.token, res.data.email)
            );
            history.push('/');
          })
          .catch((error) => {
            if (error.response) {
              dispatch(createError(error.response.data.message));
            }
          });
      } catch (err) {}
    } else {
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/house/login`, {
            houseName: formState.inputs.houseName.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(stopLoading());
            dispatch(
              startHouseAuth(
                res.data.houseId,
                res.data.token,
                res.data.houseName
              )
            );
            history.push('/');
          })
          .catch((error) => {
            if (error.response) {
              dispatch(createError(error.response.data.message));
            }
          });
      } catch (err) {
        dispatch(createError(err.message));
      }
    }
  };

  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          houseName: undefined,
          // remember: undefined,
          email: {
            value: '',
            isValid: false,
          },
        },
        false
      );
      setHouseLogin(false);
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const switchToHouseLogin = () => {
    setFormData(
      {
        ...formState.inputs,
        email: undefined,
        houseName: {
          value: '',
          isValid: false,
        },
      },
      false
    );
    setHouseLogin(true);
  };

  const switchToUserLogin = () => {
    setFormData(
      {
        ...formState.inputs,
        houseName: undefined,
        email: {
          value: '',
          isValid: false,
        },
      },
      false
    );
    setHouseLogin(false);
  };

  return (
    <div>
      <h1 className={styles.mainHeader}>App name</h1>
      <div className={styles.authDiv}>
        {isLoginMode ? (
          <div className={styles.switchTypeDiv}>
            <h3
              onClick={switchToHouseLogin}
              className={houseLogin ? styles.active : null}
            >
              HOUSE LOGIN
            </h3>
            <h3
              onClick={switchToUserLogin}
              className={!houseLogin ? styles.active : null}
            >
              USER LOGIN
            </h3>
          </div>
        ) : null}
        {/* <form onSubmit={authSubmitHandler} className={styles.authForm}>
          {!houseLogin ? (
            <Input
              element="input"
              id="email"
              type="email"
              label="E-mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter valid email adress."
              onInput={inputHandler}
            />
          ) : (
            <Input
              element="input"
              id="houseName"
              type="text"
              label="House name"
              validators={[]}
              errorText="Please enter valid house name."
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <button
            type="Submit"
            disabled={!formState.isValid}
            className={styles.loginBtn}
          >
            {isLoginMode ? 'Login' : 'SignUp'}
          </button>
        </form> */}
        <Login />;
        <button onClick={switchModeHandler} className={styles.signupBtn}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
