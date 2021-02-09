import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import ImageUpload from '../shared/FormElements/ImageUpload';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './AnnouncementsControl.module.css';
import { useSelector } from 'react-redux';
import {
  createError,
  startLoading,
  stopLoading,
} from '../Store/actions/Loading';

const AnnouncementsControl = (props) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState();
  const { token } = useSelector((state) => ({ ...state.auth }));
  const houseParam = props;
  let imagesRadio;
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      body: {
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/announcement/images`)
      .then((response) => {
        setImages(response.data.images);
      })
      .catch((err) => {
        console.log(+err);
      });
  }, []);

  const revealAnnouncModal = () => {
    setShowModal(true);
  };

  const closeAnnouncModal = () => {
    setShowModal(false);
  };

  const addAnnouncSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(startLoading());
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
          {
            title: formState.inputs.title.value,
            body: formState.inputs.body.value,
            image: formState.inputs.image.value,
            house: houseParam,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(stopLoading());
          props.onCreate();
          closeAnnouncModal();
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

  if (images) {
    let count = 0;
    imagesRadio = images.map((img) => {
      count++;
      return (
        <Input
          element="radio"
          id="image"
          type="radio"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          src={img}
          key={img}
          name={img}
        />
      );
    });
  }
  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeAnnouncModal}
        header="ANNOUNCE!"
        onSubmit={addAnnouncSubmitHandler}
      >
        <Input
          element="input"
          id="title"
          type="text"
          label="Announcement title"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter announcement title."
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="body"
          type="text"
          label="Announcement"
          validators={[VALIDATOR_REQUIRE()]}
          error="Please enter announcement."
          onInput={inputHandler}
        />
        <div className={styles.radioDiv}>{imagesRadio}</div>
        {/* <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        /> */}
        <div className={styles.btnDiv}>
          <Button onClick={closeAnnouncModal} type="button">
            CANCEL
          </Button>
          <Button type="Submit">CREATE</Button>
        </div>
      </Modal>
      <AddButton clicked={revealAnnouncModal} btnText="CREATE ANNOUNCEMENT" />
    </React.Fragment>
  );
};

export default AnnouncementsControl;
