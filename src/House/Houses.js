import { 
  useSelector,
  useDispatch,
}                      	from 'react-redux'
import React 						from 'react'

import {
  closeForm,
  createForm
}                       from '../Form/thunks'
import Button 					from '../shared/FormElements/Button'
import useFetchData 		from '../shared/hooks/fetchData-hook'
import usePostData 			from '../shared/hooks/postData-hook'

import HouseList        from './HouseList'
import HouseForm        from './form'
import styles 					from './Houses.module.css'


const Houses = () => {
  const { token, userId } = useSelector((state) => ({ ...state.auth }))
  const dispatch = useDispatch()
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/house/user/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  )
  const { post } = usePostData()


  const createHouseHandler = (houseName, password) => {
    const addFilter = (res) => {
      if (loadedData.data) {
        loadedData.setData((prevData) => [...prevData, res])
      } else {
        loadedData.setData([res])
      }
    }

    const createdHouse = {
      houseName,
      password,
    }
    post(
      `${process.env.REACT_APP_BACKEND_URL}/house/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      createdHouse,
      addFilter
    )
    dispatch(closeForm())
  }

  const callForm = () => {
    dispatch(createForm(
      HouseForm(createHouseHandler),
      'CREATE HOUSE?'
    ))
  }

  return (
    <div className={styles.housesDiv}>
      <HouseList loadedData={loadedData}/>
      <Button
        onClick={callForm}
        className={styles.createHouseBtn}
        danger
      >
				ADD HOUSE
      </Button>
    </div>
  )
}

export default Houses
