import {
  useState,
  useEffect,
}                       from 'react'
import { useDispatch }  from 'react-redux'
import axios            from 'axios'

import {
  createError,
  initiateLoading,
  stopLoading,
}                       from '../../Loading/thunks'


export default (url, headers) => {
  const [data, setData] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initiateLoading())
    axios
      .get(url, headers)
      .then((response) => {
        dispatch(stopLoading())
        setData(response.data)
        setDataLoaded(true)
      })
      .catch((err) => {
        dispatch(createError(err.message))
      })
  }, [])

  return { data, dataLoaded, setData }
}