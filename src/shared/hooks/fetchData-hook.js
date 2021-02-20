import { useState, useEffect } from 'react';

import axios from 'axios';

import {
  createError,
  startLoading,
  stopLoading,
} from '../../Store/actions/Loading';
import { useDispatch } from 'react-redux';

const useFetchData = (url, headers) => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading());
        setData(response.data);
        setDataLoaded(true);
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  }, []);

  return { data, dataLoaded, setData };
};

export default useFetchData;
