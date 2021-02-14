import React, { useEffect, useState } from 'react';
import { Form, Field, Formik } from 'formik';
import { useLoadData } from '../shared/hooks/loadData-hook';

import Button from '../shared/FormElements/Button';
import FormModal from '../shared/UIElements/FormModal/FormModal';
// import ImageUpload from '../shared/FormElements/ImageUpload';

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
    let checked = false;
    imagesRadio = data.map((img) => {
      if (checked) {
        return (
          <div key={img} className={styles.radioDiv}>
            <label>
              <Field
                type="radio"
                name="image"
                value={img}
                className={styles.radio}
              />
              <img src={img} className={styles.img} />
            </label>
          </div>
        );
      } else {
        checked = true;
        return (
          <div key={img} className={styles.radioDiv}>
            <label>
              <Field
                type="radio"
                name="image"
                value={img}
                className={styles.radio}
                checked
              />
              <img src={img} className={styles.img} />
            </label>
          </div>
        );
      }
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
        addAnnouncSubmitHandler(values.title, values.body, values.image);
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
          <div className={styles.outerRadioDiv}>{imagesRadio}</div>
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
