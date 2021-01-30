import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import ImageUpload from '../shared/FormElements/ImageUpload';
import ErrorModal from '../shared/UIElements/ErrorModal';
import Modal from '../shared/UIElements/Modal';
import Spinner from '../shared/Spinner/Spinner';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { AuthContext } from '../shared/Context/auth-context';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './RoomsControl.module.css';

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
      roomName: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append('roomName', formState.inputs.roomName.value);
    formData.append('house', houseId);
    formData.append('image', formState.inputs.image.value);

    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/room/`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsLoading(false);
          props.onCreate();
          closeAddRoomModal();
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
        onCancel={closeAddRoomModal}
        header="Add Room"
        onSubmit={addRoomSubmitHandler}
      >
        {isLoading && <Spinner asOverlay />}
        <Input
          element="input"
          id="roomName"
          type="text"
          label="Room name"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter room name."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        />
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
