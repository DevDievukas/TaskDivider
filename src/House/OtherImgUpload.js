import React from 'react';

import Button from '../shared/FormElements/Button';
import ImageUpload from '../shared/FormElements/ImageUpload';
import { Form, Formik } from 'formik';

import usePostData from '../shared/hooks/postData-hook';

import styles from './Houses.module.css';

const Auth = (props) => {
  const { post } = usePostData();

  const authSubmitHandler = async (image) => {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);

    Object.values(image).forEach((img) => {
      formData.append('images', img);
    });

    post(
      `${process.env.REACT_APP_BACKEND_URL}/room/image`,
      {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      },
      formData,
      () => console.log('test')
    );
  };

  return (
    <Formik
      initialValues={{
        image: null,
      }}
      onSubmit={async (values) => {
        // console.log(typeof values.files);
        authSubmitHandler(values.image);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className={styles.form}>
          <label htmlFor="image">File upload</label>
          <ImageUpload
            id="image"
            center
            setFiles={(event) => {
              // console.log(event.currentTarget.files);
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
          <Button type="submit" className={styles.button}>
            CREATE!
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Auth;
