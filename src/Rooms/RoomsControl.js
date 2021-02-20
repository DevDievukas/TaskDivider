import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';

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

  const addRoomSubmitHandler = (roomName) => {
    const createdRoom = {
      roomName,
      house: houseParam,
    };
    createRoom(createdRoom);
    setShowModal(false);
  };

  const form = (
    <Formik
      initialValues={{
        roomName: '',
      }}
      onSubmit={async (values) => {
        // console.log(values);
        addRoomSubmitHandler(values.roomName);
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id="roomName" name="roomName" type="input" title="ROOM NAME" />

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
