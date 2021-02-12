import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createError,
  startLoading,
  stopLoading,
} from '../../Store/actions/Loading';

export const useLoadData = (url, headers) => {
  const [data, setData] = useState([]);
  const [nonArrayData, setNonArrayData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getData(url, headers);
  }, []);

  const getData = (url, headers) => {
    dispatch(startLoading());
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading());
        console.log(response.data);
        if (response.data.length > 0) {
          setData(response.data);
        } else {
          setNonArrayData(response.data);
        }
      })
      .catch((err) => {
        dispatch(createError(err.response.data.message));
      });
  };

  const deleteData = (url, headers, id) => {
    axios
      .delete(url + id, headers)
      .then((res) => {
        setData((prevData) => prevData.filter((element) => element._id !== id));
      })
      .catch((err) => {
        dispatch(createError(err.response.data.message));
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
        dispatch(createError(err.response.data.message));
      });
  };

  return { data, nonArrayData, setData, deleteData, postData };
};
