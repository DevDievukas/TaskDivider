import React, { useCallback, useReducer, useState } from 'react';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import axios from 'axios';

import Modal from './Modal/Modal';

import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

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

const Form = (props) => {
  const [success, setSuccess] = useState(null);
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      vardas: {
        value: '',
        isValid: false,
      },
      prašymas: {
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

  let today = new Date(),
    date = today.getMonth() + 1 + '-' + today.getDate();

  const postRequest = () => {
    axios
      .post(`https://tvarkymas-4237a.firebaseio.com/Requests/.json`, [
        formState.inputs.vardas.value,
        formState.inputs.prašymas.value,
        date,
      ])
      .then((res) => {
        console.log('[App]' + res);
        setSuccess(<Modal close={props.close} />);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('Vardas', formState.inputs.vardas.value);
    postRequest();
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Input
          id="vardas"
          placeholder="Vardas"
          element="input"
          type="text"
          // label="vardas"
          validators={[VALIDATOR_REQUIRE()]}
          error="Įveskite vardą."
          onInput={InputHandler}
          initialValue={props.name}
          initialValid={props.name}
        />
        <Input
          id="prašymas"
          placeholder="Prašymas"
          element="input"
          type="text"
          // label="prašymas"
          validators={[VALIDATOR_REQUIRE()]}
          error="Įveskite tai ko jums trūksta name"
          onInput={InputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Pateikti Prašymą
        </Button>
      </form>
      {success}
    </div>
  );
};

export default Form;
