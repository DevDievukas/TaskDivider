import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Input from '../shared/FormElements/Input';
import { useForm } from '../shared/hooks/form-hook';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/Spinner/Spinner';

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { useLoadingHook } from '../shared/hooks/loading-hook';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
} from '../shared/validators/validators';

import styles from './Auth.module.css';
import { startHouseAuth, startUserAuth } from '../Store/actions/Auth';

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [houseLogin, setHouseLogin] = useState(true);
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
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

  useEffect(() => {
    if (auth.userId) {
      history.push('/houses');
    } else if (auth.houseId) {
      history.push(`/${auth.houseId}/schedule`);
    }
  }, [auth.token]);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode && !houseLogin) {
      setIsLoading(true);
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(
              startUserAuth(res.data.userId, res.data.token, res.data.email)
            );
            history.push('/houses');
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.response) {
              setError(error.response.data.message);
            }
          });
      } catch (err) {}
    } else if (!isLoginMode && !houseLogin) {
      setIsLoading(true);
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(
              startUserAuth(res.data.userId, res.data.token, res.data.email)
            );
            history.push('/houses');

            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.response) {
              setError(error.response.data.message);
            }
          });
      } catch (err) {}
    } else {
      setIsLoading(true);
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/house/login`, {
            houseName: formState.inputs.houseName.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            dispatch(
              startHouseAuth(
                res.data.houseId,
                res.data.token,
                res.data.houseName
              )
            );
            history.push(`${res.data.houseId}/announcements`);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.response) {
              setError(error.response.data.message);
            }
          });
      } catch (err) {}
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
      <ErrorModal error={error} onClear={clearError} />
      <h1 className={styles.mainHeader}>App name</h1>
      <div className={styles.authDiv}>
        {isLoading && <LoadingSpinner asOverlay />}
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
        <form onSubmit={authSubmitHandler} className={styles.authForm}>
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
          {/* {isLoginMode ? (
            <Input
              element="checkbox"
              id="remember"
              type="checkbox"
              validators={[]}
              onInput={inputHandler}
              initialValue="false"
              initialValid={true}
            />
          ) : null} */}
          <button
            type="Submit"
            disabled={!formState.isValid}
            className={styles.loginBtn}
          >
            {isLoginMode ? 'Login' : 'SignUp'}
          </button>
        </form>
        <button onClick={switchModeHandler} className={styles.signupBtn}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
