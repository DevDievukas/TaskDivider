import {
  Field,
  Form,
  Formik
}                     from 'formik';
import  { useState }  from 'react'
import React          from 'react';

import Input          from '../shared/FormElements/Input';
import Button         from '../shared/FormElements/Button';
import useFetchData   from '../shared/hooks/fetchData-hook';
import FormModal      from '../shared/UIElements/FormModal/FormModal';

import styles         from './AnnouncementsControl.module.css';

const AnnouncementsControl = (props) => {
  const [showModal, setShowModal] = useState(false);
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/announcement/images/${process.env.REACT_APP_ANOUNCEMENTS_IMAGES_ID}`,
    {
      headers: {
        authorization: `Bearer ${props.token}`,
      },
    }
  );
  
  const { houseParam, onCreate } = props;
  let imagesRadio;

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

  if (loadedData.data.length > 0) {
    let checked = false;
    imagesRadio = loadedData.data.map((img) => {
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
              <img src={img} alt="announcement" className={styles.img} />
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
              <img src={img} alt="announcement" className={styles.img} />
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
        image: loadedData.data[0] || '',
      }}
      onSubmit={async (values) => {
        // console.log(values);
        addAnnouncSubmitHandler(values.title, values.body, values.image);
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input
            id="title"
            name="title"
            type="input"
            title="ANNOUNCEMENT TITLE"
          />
          <Input id="body" name="body" type="text" title="ANNOUNCEMENT" />
          <div className={styles.buttonsDiv}>
            <Button
              type="button"
              cancel
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
      <Button onClick={revealAnnouncModal} className={styles.btn}>
        CREATE ANNOUNCEMENT
      </Button>
    </React.Fragment>
  );
};

export default AnnouncementsControl;
