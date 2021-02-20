import React from 'react';
import axios from 'axios';
import { Form, Formik } from 'formik';

import ImageUpload from '../shared/FormElements/ImageUpload';
import { useSelector } from 'react-redux';

const ImgUpload = () => {
  const token = useSelector((state) => state);

  const addImageSubmitHandler = (image) => {
    const formData = new FormData();
    formData.append('image', image);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/room/image/`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Formik
      initialValues={{
        file: null,
      }}
      onSubmit={async (values) => {
        // console.log(values.file);
        addImageSubmitHandler(values.file);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <label htmlFor="file">File upload</label>
          <ImageUpload
            id="file"
            center
            setFiles={(event) => {
              // console.log(event.currentTarget.files);
              setFieldValue('file', event.currentTarget.files[0]);
            }}
          />
          <div>
            <button type="submit">CREATE!</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ImgUpload;
