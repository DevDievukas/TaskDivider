import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createError,
  startLoading,
  stopLoading,
} from '../../Store/actions/Loading';

export const useLoadData = (url, headers) => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      if (data.length < 1) {
        if (data[0] == undefined) {
          setData(null);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    dispatch(startLoading());
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading());
        // console.log(response.data);
        if (response.data.length > 0) {
          setData(response.data);
        }
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  }, [url, dispatch]);

  const deleteData = (url, headers, id) => {
    axios
      .delete(url + id, headers)
      .then((res) => {
        setData((prevData) => prevData.filter((element) => element._id !== id));
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  };

  const postData = (url, headers, createdData) => {
    dispatch(startLoading());
    axios
      .post(url, createdData, headers)
      .then((res) => {
        dispatch(stopLoading());
        if (data) {
          setData((prevData) => [...prevData, res.data]);
        } else {
          setData([res.data]);
        }
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  };

  return { data, setData, deleteData, postData };
};
