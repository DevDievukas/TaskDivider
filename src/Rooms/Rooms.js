import { useSelector } 	from 'react-redux'
import { useParams } 		from 'react-router-dom'
import React 						from 'react'

import EmptyData 				from '../shared/UIElements/EmptyData/EmptyData.tsx'
import useDeleteData 		from '../shared/hooks/deleteData-hook'
import useFetchData 		from '../shared/hooks/fetchData-hook'
import usePostData 			from '../shared/hooks/postData-hook'


import RoomsControl 		from './RoomsControl'
import RoomElement 			from './RoomElement'
import styles 					from './Rooms.module.css'

const Rooms = () => {
  const houseParam = useParams().houseId
  const {userId, houseId, token} = useSelector((state) => ({
    ...state.auth,
  }))
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${
      houseId || houseParam
    }`
  )
  const { post } = usePostData()
  const { deleteData } = useDeleteData()
  let rooms

  const createRoomHandler = (createdRoom) => {
    const addFilter = (res) => {
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
      createdRoom,
      addFilter
    )
  }

  const deleteRoomHandler = (id) => {
    const deleteFilter = () => {
      loadedData.setData((prevData) =>
        prevData.filter((element) => element._id !== id)
      )
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
      {userId ? <RoomsControl createRoom={createRoomHandler} /> : null}
      {rooms}
    </div>
  )
}

export default Rooms
