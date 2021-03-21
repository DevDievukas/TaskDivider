import { 
  useSelector,
  useDispatch,
}                      	    from 'react-redux'
import axios                from 'axios'
import React 						    from 'react'

import {
  createErrorMessage,
  createSuccessMessage
}                           from '../Modal/thunks'
import {
  closeForm,
  createForm
}                           from '../Form/thunks'
import Button 					    from '../shared/FormElements/Button'
import useFetchData 		    from '../shared/hooks/fetchData-hook'
import { house }            from '../strings/form'
import { houseCreateFail }  from '../strings/error'
import { houseCreated }     from '../strings/success'

import HouseList            from './HouseList'
import HouseForm            from './form'
import styles 					    from './Houses.module.css'


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

  const addFilter = (res) => {
    if (loadedData.data) {
      loadedData.setData((prevData) => [...prevData, res])
    } else {
      loadedData.setData([res])
    }
  }


  const createHouseHandler = (houseName, password) => {
    const createdHouse = {
      houseName,
      password,
    }

    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/house/`,
      createdHouse,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    ).then(res => {
      addFilter(res.data)
      dispatch(createSuccessMessage(houseCreated))
      dispatch(closeForm())
    }).catch(() => {
      dispatch(createErrorMessage(houseCreateFail))
    })
  }

  const callForm = () => {
    dispatch(createForm(
      <HouseForm createHouseHandler={createHouseHandler} />,
      house
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
