import axios from 'axios';

import { useDispatch } from 'react-redux';

import { createError } from '../../Store/actions/Loading';

const useDeleteData = () => {
  const dispatch = useDispatch();
  const deleteData = (url, headers, id, method) => {
    axios
      .delete(url + id, headers)
      .then((res) => {
        method();
      })
      .catch((err) => {
        dispatch(createError(err.message));
      });
  };
  return { deleteData };
};

export default useDeleteData;
