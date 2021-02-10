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
    dispatch(startLoading());
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading());
        setData(response.data);
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  }, [url, dispatch]);

  return { data, setData };
};
