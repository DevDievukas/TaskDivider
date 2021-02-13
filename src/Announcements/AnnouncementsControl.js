import React, { useEffect, useState } from 'react';
import { Form, Field, Formik } from 'formik';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import Input from '../shared/FormElements/Input';
import FormModal from '../shared/UIElements/FormModal/FormModal';
// import ImageUpload from '../shared/FormElements/ImageUpload';
import { VALIDATOR_REQUIRE } from '../shared/validators/validators';

import styles from './AnnouncementsControl.module.css';

const AnnouncementsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { data, getData } = useLoadData();
  const { houseParam, onCreate } = props;
  let imagesRadio;

  useEffect(() => {
    getData(`${process.env.REACT_APP_BACKEND_URL}/announcement/images`);
  }, []);

  const revealAnnouncModal = () => {
    setShowModal(true);
  };

  const closeAnnouncModal = () => {
    setShowModal(false);
  };

  const addAnnouncSubmitHandler = (title, body, image) => {
    const newAnnouncement = {
      title,
      body,
      image,
      house: houseParam,
    };
    onCreate(newAnnouncement);
    setShowModal(false);
  };

  if (data.length > 0) {
    imagesRadio = data.map((img) => {
      // console.log('it happened');
      return (
        <div className={styles.radioDiv}>
          <label>
            <Field type="checkbox" name="remember" /> Remember me?
          </label>
        </div>

        // <Input
        //   element="radio"
        //   id="image"
        //   type="radio"
        //   validators={[VALIDATOR_REQUIRE()]}
        //   src={img}
        //   key={img}
        //   name={img}
        // />
      );
    });
  }

  const form = (
    <Formik
      initialValues={{
        title: '',
        body: '',
        image: '',
      }}
      onSubmit={async (values) => {
        console.log(values);
      }}
    >
      {({}) => (
        <Form className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="title" name="title" type="input" />
              <label htmlFor="title">ANNOUNCEMENT TITLE</label>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.field}>
              <Field required id="body" name="body" type="text" />
              <label htmlFor="body">ANNOUNCEMENT</label>
            </div>
          </div>
          <div className={styles.buttonsDiv}>
            <Button
              type="button"
              danger
              className={styles.button}
              onClick={closeAnnouncModal}
            >
              CANCEL
            </Button>
            <Button type="submit" className={styles.button}>
              CREATE!
            </Button>
          </div>
          {imagesRadio}
        </Form>
      )}
    </Formik>
  );

  return (
    <React.Fragment>
      <FormModal
        onCancel={closeAnnouncModal}
        header="ANNOUNCE?"
        show={showModal}
        form={form}
      />
      <Button onClick={revealAnnouncModal}> CREATE ANNOUNCEMENT</Button>
    </React.Fragment>
  );
};

export default AnnouncementsControl;
