import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useForm } from '../shared/hooks/form-hook';

import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import axios from 'axios';

import { VALIDATOR_REQUIRE } from '../shared/validators/validators';
import { useSelector } from 'react-redux';

import styles from './Form.module.css';

const Form = (props) => {
  const houseParam = useParams().houseId;
  const token = useSelector((state) => state.token);
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

  const postRequest = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/request`,
        {
          author: formState.inputs.author.value,
          body: formState.inputs.body.value,
          house: houseParam,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.table(res);
      })
      .catch((err) => {
        console.log('[App] ' + err);
      });
  };

  const deleteRequests = () => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/request/all/${houseParam}`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.table(res.data);
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
      <form onSubmit={formSubmit} className={styles.form}>
        <Input
          id="author"
          placeholder="Vardas"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Įveskite vardą."
          onInput={inputHandler}
          initialValue={props.name}
          initialValid={props.name}
        />
        <Input
          id="body"
          placeholder="Prašymas"
          element="input"
          type="text"
          validators={[VALIDATOR_REQUIRE()]}
          error="Įveskite tai ko jums trūksta name"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Pateikti Prašymą
        </Button>
      </form>
      <Button danger onClick={deleteRequests}>
        Panaikinti prašymus
      </Button>
      <Button
        danger
        onClick={() =>
          console.log(
            formState.inputs.body.isValid +
              ' ' +
              formState.inputs.author.isValid +
              ' ' +
              formState.isValid
          )
        }
      >
        test
      </Button>
    </div>
  );
};

export default Form;
