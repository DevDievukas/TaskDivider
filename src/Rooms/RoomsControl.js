import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import ImageUpload from '../shared/FormElements/ImageUpload';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './RoomsControl.module.css';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = props;
  const dispatch = useDispatch();
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
    dispatch(startLoading());
    // const formData = new FormData();
    // formData.append('roomName', formState.inputs.roomName.value);
    // formData.append('house', houseId);
    // formData.append('image', formState.inputs.image.value);

    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/room/`,
          { roomName: formState.inputs.roomName.value, house: houseParam },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(stopLoading());
          // props.onCreate();
          closeAddRoomModal();
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
