import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Modal from '../shared/UIElements/Modal';
import Spinner from '../shared/Spinner/Spinner';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { AuthContext } from '../shared/Context/auth-context';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';
import { useLoadingHook } from '../shared/hooks/loading-hook';

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useContext(AuthContext);
  const houseId = useParams().houseId;
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
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
    setIsLoading(true);
    const person = {
      name: formState.inputs.name.value,
      house: houseId,
    };
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/person/`, person, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          props.onCreate();
          closeAddPersonModal();
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            setError(error.response.data.message);
          }
        });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        onCancel={closeAddPersonModal}
        header="Add Person"
        onSubmit={addPersonSubmitHandler}
      >
        {isLoading && <Spinner asOverlay />}
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
