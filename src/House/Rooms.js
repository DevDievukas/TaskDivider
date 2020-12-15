import React from 'react';
import Input from '../shared/FormElements/Input';
import Button from '../shared/FormElements/Button';
import ImageUpload from '../shared/FormElements/ImageUpload';

import { useForm } from '../shared/hooks/form-hook';
import axios from 'axios';

const Rooms = () => {
  const [formState, inputHandler] = useForm(
    {
      roomName: {
        value: '',
        isValid: false,
      },
      images: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const roomSubmitHandler = () => {
    try {
      const formData = new FormData();
      formData.append('roomName', formState.inputs.roomName.value);
      formData.append('images', formState.inputs.images.value);
      axios
        .post('http://localhost:5000/api/house/addRoom', formData)
        .then((res) => {
          console.log('[res]  ' + JSON.stringify(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>House Name</h1>
      <form onSubmit={() => console.log(formState)}>
        <Input
          element="input"
          id="name"
          type="text"
          label="Name"
          error="Please enter a name."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="please provide an image"
        />
        <Button type="Submit" disabled={!formState.isValid}>
          Add Room
        </Button>
      </form>
    </div>
  );
};

export default Rooms;
