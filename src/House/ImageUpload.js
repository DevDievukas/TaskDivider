import React from 'react';

import Button from '../shared/FormElements/Button';
import ImageUpload from '../shared/FormElements/OldImage';
import { useForm } from '../shared/hooks/form-hook';

import usePostData from '../shared/hooks/postData-hook';

const Auth = (props) => {
  const { post } = usePostData();
  const [formState, inputHandler, setFormData] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(formState.inputs.image.value);
    const formData = new FormData();
    formData.append('image', formState.inputs.image.value);

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
    <React.Fragment>
      <form onSubmit={authSubmitHandler}>
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit">Submit</Button>
      </form>
    </React.Fragment>
  );
};

export default Auth;
