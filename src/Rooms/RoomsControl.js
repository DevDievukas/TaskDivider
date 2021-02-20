import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

import ImageUpload from '../shared/FormElements/ImageUpload';
import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import FormModal from '../shared/UIElements/FormModal/FormModal';

import styles from './RoomsControl.module.css';

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { createRoom } = props;
  const houseParam = useParams().houseId;

  const revealAddRoomModal = () => {
    setShowModal(true);
  };

  const closeAddRoomModal = () => {
    setShowModal(false);
  };

  const addRoomSubmitHandler = (roomName, images) => {
    const formData = new FormData();
    formData.append('roomName', roomName);
    formData.append('house', houseParam);
    Object.values(images).forEach((img) => {
      formData.append('images', img);
    });
    createRoom(formData);
    setShowModal(false);
  };

  const form = (
    <Formik
      initialValues={{
        roomName: '',
        image: null,
      }}
      onSubmit={async (values) => {
        addRoomSubmitHandler(values.roomName, values.image);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <Input id="roomName" name="roomName" type="input" title="ROOM NAME" />
          <ImageUpload
            id="image"
            center
            className={styles.imgUpload}
            setFiles={(event) => {
              setFieldValue('image', event.currentTarget.files);
            }}
          />
          {/* <input
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              setFieldValue('file', event.currentTarget.files[0]);
            }}
          /> */}
          <div className={styles.buttonsDiv}>
            <Button
              type="button"
              cancel
              className={styles.button}
              onClick={closeAddRoomModal}
            >
              CANCEL
            </Button>
            <Button type="submit" className={styles.button}>
              CREATE!
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );

  return (
    <React.Fragment>
      <FormModal
        onCancel={closeAddRoomModal}
        header="ADD ROOM?"
        show={showModal}
        form={form}
      />
      <Button onClick={revealAddRoomModal} className={styles.btn}>
        ADD ROOM
      </Button>
    </React.Fragment>
  );
};

export default RoomsControl;
