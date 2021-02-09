import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';
import { useDispatch } from 'react-redux';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { token } = props;
  const houseParam = useParams().houseId;
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const revealAddPersonModal = () => {
    setShowModal(true);
  };

  const closeAddPersonModal = () => {
    setShowModal(false);
  };

  const addPersonSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(startLoading());
    const person = {
      name: formState.inputs.name.value,
      house: houseParam,
    };
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/person/`, person, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(stopLoading());
          props.onCreate();
          closeAddPersonModal();
        })
        .catch((error) => {
          if (error.response) {
            dispatch(createError(error.response.data.message));
          }
        });
    } catch (err) {
      dispatch(createError(err.message));
    }
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeAddPersonModal}
        header="Add Person"
        onSubmit={addPersonSubmitHandler}
      >
        <Input
          element="input"
          id="name"
          type="text"
          label="Name"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter a name."
          onInput={inputHandler}
        />
        <Button type="button" onClick={closeAddPersonModal}>
          CANCEL
        </Button>
        <Button type="Submit" disabled={!formState.isValid}>
          CREATE
        </Button>
      </Modal>
      <AddButton clicked={revealAddPersonModal} btnText="ADD PERSON" />
    </React.Fragment>
  );
};

export default RoomsControl;
