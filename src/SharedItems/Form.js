import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from '../shared/hooks/form-hook';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import axios from 'axios';

import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './Form.module.css';

const Form = (props) => {
  const houseParam = useParams().houseId;
  const { houseId } = props;
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

  console.log(formState.inputs.author.value);

  useEffect(() => {
    const name = localStorage.getItem('Vardas');
    inputHandler('author', name, true);
  }, []);

  const postRequest = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/request`, {
        author: formState.inputs.author.value,
        body: formState.inputs.body.value,
        house: houseParam || houseId,
      })
      .then((res) => {
        console.table(res);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('Vardas', formState.inputs.author.value);
    postRequest();
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
