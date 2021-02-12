import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
// import ImageUpload from '../shared/FormElements/ImageUpload';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './RoomsControl.module.css';

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { createRoom } = props;
  const houseParam = useParams().houseId;
  const [formState, inputHandler] = useForm(
    {
      roomName: {
        value: '',
        isValid: false,
      },
      // image: {
      //   value: null,
      //   isValid: false,
      // },
    },
    false
  );

  const revealAddRoomModal = () => {
    setShowModal(true);
  };

  const closeAddRoomModal = () => {
    setShowModal(false);
  };

  const addRoomSubmitHandler = (event) => {
    event.preventDefault();

    const createdRoom = {
      roomName: formState.inputs.roomName.value,
      house: houseParam,
    };
    createRoom(createdRoom);
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeAddRoomModal}
        header="Add Room"
        onSubmit={addRoomSubmitHandler}
      >
        <Input
          element="input"
          id="roomName"
          type="text"
          label="Room name"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter room name."
          onInput={inputHandler}
        />
        {/* <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        /> */}
        <div className={styles.btnDiv}>
          <Button onClick={closeAddRoomModal} type="button">
            CANCEL
          </Button>
          <Button type="Submit" disabled={!formState.isValid}>
            CREATE
          </Button>
        </div>
      </Modal>
      <AddButton clicked={revealAddRoomModal} btnText="ADD ROOM" />
    </React.Fragment>
  );
};

export default RoomsControl;
