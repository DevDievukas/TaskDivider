import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Field, Formik } from 'formik';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import FormModal from '../shared/UIElements/FormModal/FormModal';
import styles from './PeopleControl.module.css';

const PeopleControl = (props) => {
  const houseParam = useParams().houseId;
  const [showModal, setShowModal] = useState(false);
  const { createPerson } = props;
  let roomsCheckbox;

  const revealAddPersonModal = () => {
    setShowModal(true);
  };

  const closeAddPersonModal = () => {
    setShowModal(false);
  };

  const addPersonSubmitHandler = (name, rooms) => {
    const person = {
      name,
      rooms,
      house: houseParam,
    };
    createPerson(person);

    setShowModal(false);
  };

  if (props.roomData.length > 0) {
    roomsCheckbox = props.roomData.map((room) => {
      return (
        <label key={room._id}>
          <Field type="checkbox" name="rooms" value={room._id} />{' '}
          {room.roomName}
        </label>
      );
    });
  }

  const form = (
    <Formik
      initialValues={{
        name: '',
        rooms: [],
      }}
      onSubmit={async (values) => {
        // console.log(values);
        addPersonSubmitHandler(values.name, values.rooms);
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id="name" name="name" type="input" title="NAME" />
          <h6>Assign Rooms</h6>
          <div className={styles.checkBoxDiv}>{roomsCheckbox}</div>

          <div className={styles.buttonsDiv}>
            <Button
              type="button"
              cancel
              className={styles.button}
              onClick={closeAddPersonModal}
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
        onCancel={closeAddPersonModal}
        header="ADD PERSON?"
        show={showModal}
        form={form}
      />
      <Button onClick={revealAddPersonModal} className={styles.btn}>
        ADD PERSON
      </Button>
    </React.Fragment>
  );
};

export default PeopleControl;
