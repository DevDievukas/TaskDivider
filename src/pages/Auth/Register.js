import React, { useReducer, useCallback } from 'react';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REPEAT_PASSWORD,
  VALIDATOR_REQUIRE,
} from '../../shared/validators/validators';
import Input from '../../shared/Input/Input';

const formReducer2 = (state, action) => {
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

const Register = () => {
  const [formState, dispatch] = useReducer(formReducer2, {
    inputs: {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
      username: {
        value: '',
        isValid: false,
      },
      repeatPassword: {
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
  
  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className="form" onSubmit={placeSubmitHandler}>
      <div className="form-group">
        <Input
          placeholder="Email adress"
          type="email"
          id="email"
          element="input"
          validators={[VALIDATOR_EMAIL()]}
          onInput={InputHandler}
        />
      </div>
      <div className="form-group">
        <Input
          placeholder="Username"
          type="input"
          id="username"
          element="input"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(10)]}
          onInput={InputHandler}
        />
      </div>
      <div className="form-group">
        <Input
          id="password"
          element="input"
          type="input"
          validators={[VALIDATOR_MINLENGTH(7)]}
          onInput={InputHandler}
          placeholder="password"
        />
      </div>
      <div className="form-group">
        <Input
          id="repeatPassword"
          element="input"
          type="input"
          validators={[
            VALIDATOR_REPEAT_PASSWORD(formState.inputs.password.value),
          ]}
          onInput={InputHandler}
          placeholder="confirm password"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!formState.isValid}
      >
        Register
      </button>
</form>  );
};

export default Register;
