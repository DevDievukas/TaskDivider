import React from 'react';

import { useForm } from '../shared/hooks/form-hook';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';

import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './Form.module.css';

const Form = (props) => {
  const { houseId, houseParam, postRequest } = props;
  const [formState, inputHandler] = useForm(
    {
      author: {
        value: '',
        isValid: false,
      },
      body: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const initialAuthor = localStorage.getItem('houseItName');

  const formSubmit = (event) => {
    event.preventDefault();
    const today = new Date();
    const date = today.getDate() + '-' + parseInt(today.getMonth() + 1);
    const request = {
      author: formState.inputs.author.value,
      body: formState.inputs.body.value,
      house: houseParam || houseId,
      date: date.toString(),
    };
    if (initialAuthor !== formState.inputs.author.value) {
      localStorage.setItem('houseItName', formState.inputs.author.value);
    }
    postRequest(request);
  };

  return (
    <div>
      <form onSubmit={formSubmit}>
        <Input
          id="author"
          placeholder="Name"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Enter name."
          onInput={inputHandler}
          initialValue={initialAuthor}
          initialValid={initialAuthor}
        />
        <Input
          id="body"
          placeholder="Request"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Enter your request"
          onInput={inputHandler}
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          className={styles.submitBtn}
        >
          SUBMIT REQUEST
        </Button>
      </form>
    </div>
  );
};

export default Form;
