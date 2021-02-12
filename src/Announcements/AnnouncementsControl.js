import React, { useState } from 'react';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
// import ImageUpload from '../shared/FormElements/ImageUpload';
import Modal from '../shared/UIElements/Modal';
import AddButton from '../shared/UIElements/AddButton/AddButton';

import { useForm } from '../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './AnnouncementsControl.module.css';

const AnnouncementsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useLoadData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/images`
  );
  const { houseParam, onCreate } = props;
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

  const revealAnnouncModal = () => {
    setShowModal(true);
  };

  const closeAnnouncModal = () => {
    setShowModal(false);
  };

  const addAnnouncSubmitHandler = (event) => {
    event.preventDefault();
    const newAnnouncement = {
      title: formState.inputs.title.value,
      body: formState.inputs.body.value,
      image: formState.inputs.image.value,
      house: houseParam,
    };
    onCreate(newAnnouncement);
    setShowModal(false);
  };

  if (data.length > 0) {
    imagesRadio = data.map((img) => {
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
