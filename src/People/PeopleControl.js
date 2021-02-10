import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

const PeopleControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { createPerson } = props;
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
    const person = {
      name: formState.inputs.name.value,
      house: houseParam,
    };

    createPerson(person);
    setShowModal(false);
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

export default PeopleControl;
