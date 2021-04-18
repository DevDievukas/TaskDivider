import {
  connect,
  useDispatch,
} 	                    from 'react-redux'
import { useParams } 		from 'react-router-dom'
import React 						from 'react'

import {
  closeForm,
  createForm,
}                       from '../Form/thunks'
import {
  createSuccessMessage,
}                       from '../Modal/thunks'
import { person }       from '../strings/form'
import { personAdded }  from '../strings/success'
import Button           from '../shared/FormElements/Button'
import EmptyData 				from '../shared/UIElements/EmptyData/EmptyData'
import useDeleteData 		from '../shared/hooks/deleteData-hook'
import useFetchData 		from '../shared/hooks/fetchData-hook'
import usePostData 			from '../shared/hooks/postData-hook'

import PeopleForm 		  from './PeopleForm'
import PersonElement 		from './PersonElement'
import styles						from './People.module.css'

const People = connect (({ auth: { token, userId }}) => (
  { token, userId }))(
  ({ token, userId }) => {
    const dispatch = useDispatch()
    const houseParam = useParams().houseId
    const loadedData = useFetchData(
      `${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseParam}`
    )
    const roomsData = useFetchData(
      `${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseParam}`
    )
    const { post } = usePostData()
    const { deleteData } = useDeleteData()
			
    let people = null

    const PersonDeleteHandler = (personId) => {
      const deleteFilter = () => {
        loadedData.setData((prevData) =>
          prevData.filter((element) => element._id !== personId)
        )
      }
      deleteData(
        `${process.env.REACT_APP_BACKEND_URL}/person/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            house: houseParam,
          },
        },
        personId,
        deleteFilter
      )
    }

    const createPersonHandler = (name, rooms) => {
      const person = {
        name,
        rooms,
        house: houseParam,
      }
      const addFilter = (res) => {
        dispatch(closeForm())
        dispatch(createSuccessMessage(personAdded))
        if (loadedData.data) {
          loadedData.setData((prevData) => [...prevData, res])
        } else {
          loadedData.setData([res])
        }
      }
      post(
        `${process.env.REACT_APP_BACKEND_URL}/person/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        person,
        addFilter
      )
    }


    if (loadedData.dataLoaded) {
      if (loadedData.data.length > 0) {
        people = loadedData.data.map((person) => {
          return (
            <PersonElement
              key={person._id}
              id={person._id}
              name={person.name}
              rooms={person.rooms}
              onDelete={PersonDeleteHandler}
              token={token}
              userId={userId}
            />
          )
        })
      } else {
        people = <EmptyData header='NO PEOPLE!' />
      }
    }

    const callForm = () => {
      dispatch(createForm(
        <PeopleForm
          createPerson={createPersonHandler}
          roomData={roomsData.data}
        />,
        person,
      ))
    }

    return (
      <div className={styles.mainDiv}>
        {userId ? (
          <Button 
            onClick={callForm}
            danger
            add
          />
        ) : null}
        <ul className={styles.groupList}>{people}</ul>
      </div>
    )
  }
)

export default People
