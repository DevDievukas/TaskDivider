import {
  connect,
  useDispatch,
}                  	    from 'react-redux'
import { useParams } 		from 'react-router-dom'
import React 						from 'react'

import {
  closeForm,
  createForm,
}                       from '../Form/thunks'
import {
  createSuccessMessage,
}                       from '../Modal/thunks'
import { room }         from '../strings/form'
import {
  roomAdded,
  roomDeleted,
}                       from '../strings/success'
import Button           from '../shared/FormElements/Button'
import EmptyData 				from '../shared/UIElements/EmptyData/EmptyData'
import useDeleteData 		from '../shared/hooks/deleteData-hook'
import useFetchData 		from '../shared/hooks/fetchData-hook'
import usePostData 			from '../shared/hooks/postData-hook'


import RoomsForm    		from './RoomsForm'
import RoomElement 			from './RoomElement'
import styles 					from './Rooms.module.css'

const Rooms = connect (({ auth: { houseId, token, userId }}) => (
  {houseId, token, userId }))(
  ({ houseId, token, userId }) => {
    const dispatch = useDispatch()
    const houseParam = useParams().houseId
    const loadedData = useFetchData(
      `${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${
        houseId || houseParam
      }`
    )
    const { post } = usePostData()
    const { deleteData } = useDeleteData()
    let rooms

    const callForm = () => {
      dispatch(createForm(
        <RoomsForm createRoom={createRoomHandler} />,
        room,
      ))
    }

    const createRoomHandler = (images, roomName) => {
      const formData = new FormData()
      formData.append('roomName', roomName)
      formData.append('house', houseParam)
      Object.values(images).forEach((img) => {
        formData.append('images', img)
      })

      const addFilter = (res) => {
        dispatch(createSuccessMessage(roomAdded))
        dispatch(closeForm())
        if (loadedData.data) {
          loadedData.setData((prevData) => [...prevData, res])
        } else {
          loadedData.setData([res])
        }
      }
      post(
        `${process.env.REACT_APP_BACKEND_URL}/room/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        formData,
        addFilter
      )
    }

    const deleteRoomHandler = (id) => {
      const deleteFilter = () => {
        loadedData.setData((prevData) =>
          prevData.filter((element) => element._id !== id)
        )
        dispatch(createSuccessMessage(roomDeleted))
      }
      deleteData(
        `${process.env.REACT_APP_BACKEND_URL}/room/`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
          data: {
            house: houseParam,
          },
        },
        id,
        deleteFilter
      )
    }

    if (loadedData.dataLoaded) {
      if (loadedData.data.length > 0) {
        rooms = (
          <ul className={styles.groupList}>
            {loadedData.data.map((room) => {
              return (
                <RoomElement
                  key={room._id}
                  room={room}
                  onDelete={deleteRoomHandler}
                  userId={userId}
                  token={token}
                />
              )
            })}
          </ul>
        )
      } else {
        rooms = <EmptyData header='NO ROOMS FOUND' />
      }
    }

    return (
      <div className={styles.mainDiv}>
        {userId ? 
          <Button
            onClick={callForm}
            danger
            add 
          /> :
          null}
        {rooms}
      </div>
    )
  }
)
export default Rooms
