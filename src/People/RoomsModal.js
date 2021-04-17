import {
  Formik,
  Field,
  Form,
} 										from 'formik'
import {
  useEffect,
  useState,
}											from 'react'
import { useParams } 	from 'react-router-dom'
import axios 					from 'axios'
import React 					from 'react'

import Button 				from '../shared/FormElements/Button'
import usePostData 		from '../shared/hooks/postData-hook'
import FormModal 			from '../shared/UIElements/FormModal/FormModal'

import styles 				from './PersonElement.module.css'
import RoomElement 		from './RoomElement'

const RoomsModal = ( props ) => {
  const [assigned, setAssigned] = useState([])
  const [unassigned, setUnassigned] = useState([])
  const { post } = usePostData()

  const houseParam = useParams().houseId
  const { personId, close, token } = props
  let assignedElements
  let unassignedElements
	
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/room/person/${personId}`)
      .then((res) => {
        const assignedTemp = []
        const notAssignedTemp = []
        if (res.data.length > 0) {
          res.data.forEach((room) => {
            if (room.assigned) {
              assignedTemp.push(room)
            } else {
              notAssignedTemp.push(room)
            }
          })
        }
        setAssigned(assignedTemp)
        setUnassigned(notAssignedTemp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [personId])

  const removeRoom = (roomId) => {
    const reqData = {
      roomId: roomId,
      house:  houseParam,
    }
    const filterRoom = (res) => {
      setUnassigned((prevData) => [...prevData, res])
      setAssigned((prevData) => prevData.filter((el) => el.id !== roomId))
    }
    post(
      `${process.env.REACT_APP_BACKEND_URL}/person/removeRoom/${personId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      reqData,
      filterRoom
    )
  }

  const assignRooms = (rooms) => {
    const reqData = {
      rooms: rooms,
      house: houseParam,
    }
    post(
      `${process.env.REACT_APP_BACKEND_URL}/person/assignRoom/${personId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      reqData,
      close
    )
  }

  if (assigned.length > 0) {
    assignedElements = assigned.map((room) => {
      return (
        <RoomElement
          key={room.id}
          roomName={room.roomName}
          unassign={removeRoom}
          roomId={room.id}
        />
      )
    })
  }
  if (unassigned.length > 0) {
    unassignedElements = unassigned.map((room) => {
      return (
        <label key={room.id}>
          <Field
            type='checkbox'
            name='rooms'
            value={room.id}
          /> {room.roomName}{' '}
        </label>
      )
    })
  }

  const form = (
    <Formik
      initialValues={{
        rooms: [],
      }}
      onSubmit={async (values) => {
        console.log(values)
        assignRooms(values.rooms)
      }}
    >
      {() => (
        <Form className={styles.form}>
          {assigned.length > 0 ? (
            <div className={styles.assignedDiv}>
              <h6>ASSIGNED</h6>
              {assignedElements}
            </div>
          ) : null}

          {unassigned.length > 0 ? (
            <div>
              <h6>NOT ASSIGNED</h6>
              <div className={styles.checkBoxDiv}>{unassignedElements}</div>
            </div>
          ) : null}
          <div className={styles.buttonsDiv}>
            <Button
              type='button'
              cancel
              className={styles.button}
              onClick={close}
            >
							CANCEL
            </Button>
            <Button type='submit' className={styles.button}>
							ASSIGN
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
  return (
    <FormModal
      onCancel={close}
      show={true}
      form={form}
      header='ASSIGN ROOMS?'
    />
  )
}

export default RoomsModal
