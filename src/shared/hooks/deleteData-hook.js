import { useDispatch } 	from 'react-redux'
import axios 						from 'axios'

import { createError } 		from '../../Loading/thunks'


export default () => {
  const dispatch = useDispatch()
  const deleteData = (url, headers, id, method) => {
    axios
      .delete(url + id, headers)
      .then(() => {
        method()
      })
      .catch((err) => {
        dispatch(createError(err.message))
      })
  }
  return {deleteData}
}

