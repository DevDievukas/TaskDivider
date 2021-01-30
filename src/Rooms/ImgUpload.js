import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import { AuthContext } from '../shared/Context/auth-context';
import AddButton from '../shared/UIElements/AddButton/AddButton';

const ImgUpload = () => {
  const [files, setFiles] = useState([]);
  const [data, setData] = useState();
  const { token } = useContext(AuthContext);

  const getImg = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/images`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   getImg();
  // }, []);

  const addImageSubmitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((element) => {
      formData.append('images', element);
    });
    // formData.append('image', formState.inputs.images);
    // formData.append('images', Object.values(formState.inputs.images.value));
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

  const fileChange = (event) => {
    event.preventDefault();
    const images = [...files];
    images.push(...event.target.files);
    setFiles(images);
  };

  return (
    <form onSubmit={addImageSubmitHandler}>
      {data ? <img src={`data:image/jpeg;base64,${data}`} alt="text" /> : null}
      <input type="file" multiple onChange={fileChange} />
      <AddButton type="submit" btnText="ADD IMAGE" />
    </form>
  );
};

export default ImgUpload;
