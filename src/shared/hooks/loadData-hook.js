import { useState }     from 'react';
import { useDispatch }  from 'react-redux';
import axios            from 'axios';

import {
  createError,
  startLoading,
  stopLoading,
}                       from '../../Store/actions/Loading';

export const useLoadData = () => {
  const [data, setData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [nonArrayData, setNonArrayData] = useState();
  const dispatch = useDispatch();

  const getData = (url, headers) => {
    dispatch(startLoading());
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading());
        // console.log(response.data);
        if (response.data.length > 0) {
          setData(response.data);
        } else {
          setNonArrayData(response.data);
        }
        setDataLoaded(true);
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  };

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
        // console.log(res.data);
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

  return {
    data,
    dataLoaded,
    nonArrayData,
    setData,
    deleteData,
    postData,
    getData,
  };
};
