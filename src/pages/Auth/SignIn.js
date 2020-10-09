import React, { useReducer, useCallback } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from '../../shared/validators/validators';
import Input from '../../shared/Input/Input';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const SignIn = (props) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const InputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: 'INPUT_CHANGE',
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <div className="form-group">
        <Input
          placeholder="Email adress"
          type="email"
          id="email"
          element="input"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter valid Email adress"
          onInput={InputHandler}
        />
      </div>
      <div className="form-group">
        <Input
          id="password"
          element="input"
          type="password"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={InputHandler}
          placeholder="password"
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label">Keep signed in</label>
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => console.log(formState.isValid)}
      >
        Sign In!
      </button>

      <p className="forgot-password">forgot password?</p>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </React.Fragment>
  );
};

export default SignIn;
