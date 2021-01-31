import React from 'react';
import axios from 'axios';

import ImageUpload from '../shared/FormElements/ImageUpload';
import { useForm } from '../shared/hooks/form-hook';
import AddButton from '../shared/UIElements/AddButton/AddButton';
import { useSelector } from 'react-redux';

const ImgUpload = () => {
  const token = useSelector((state) => state);
  const [formState, inputHandler] = useForm({
    image: {
      value: null,
      isValid: false,
    },
  });

  const addImageSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', formState.inputs.image.value);
    try {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/room/image/`, formData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form onSubmit={addImageSubmitHandler}>
      <ImageUpload
        id="image"
        center
        onInput={inputHandler}
        errorText="please provide an image"
      />
      <AddButton type="submit" btnText="ADD IMAGE" />
    </form>
  );
};

export default ImgUpload;
