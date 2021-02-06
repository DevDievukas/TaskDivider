import React, { useEffect, useState } from 'react';
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
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';
import { useLoadingHook } from '../shared/hooks/loading-hook';

import styles from './AnnouncementsControl.module.css';
import { useSelector } from 'react-redux';

const AnnouncementsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState();
  const token = useSelector((state) => state.token);
  const houseId = useParams().houseId;
  let imagesRadio;
  const {
    error,
    setError,
    clearError,
    isLoading,
    setIsLoading,
  } = useLoadingHook();
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
    setIsLoading(true);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
          {
            title: formState.inputs.title.value,
            body: formState.inputs.body.value,
            image: formState.inputs.image.value,
            house: houseId,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          props.onCreate();
          closeAnnouncModal();
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
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showModal}
        onCancel={closeAnnouncModal}
        header="ANNOUNCE!"
        onSubmit={addAnnouncSubmitHandler}
      >
        {isLoading && <Spinner asOverlay />}
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
