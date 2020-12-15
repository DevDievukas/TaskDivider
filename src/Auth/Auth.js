import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import { useForm } from '../shared/hooks/form-hook';
import ErrorModal from '../shared/UIElements/ErrorModal';
import LoadingSpinner from '../shared/Spinner/Spinner';
import Card from 'react-bootstrap/Card';

import axios from 'axios';

import { useLoadingHook } from '../shared/hooks/loading-hook';

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from '../shared/validators/validators';
import { AuthContext } from '../shared/Context/auth-context';

import styles from './Auth.module.css';

const Auth = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      setIsLoading(true);
      try {
        axios
          .post('http://localhost:5000/api/users/login', {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            auth.login(res.data.userId, res.data.token);
            setIsLoading(false);
            history.push(`/Houses`);
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.message);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsLoading(true);
      try {
        axios
          .post('http://localhost:5000/api/users/signup', {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          })
          .then((res) => {
            auth.login(res.data.userId, res.data.token);
            setIsLoading(false);
            history.push(`/Houses`);
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error.message);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          <Input
            element="input"
            id="email"
            type="email"
            label="E-mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter valid email adress."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="Submit" disabled={!formState.isValid}>
            {isLoginMode ? 'Login' : 'SignUp'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
