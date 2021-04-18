import {
  useRef,
  useEffect,
  useState,
}                       from 'react'
import Carousel         from 'react-bootstrap/Carousel'
import React            from 'react'

import Button           from '../shared/FormElements/Button'
import Modal            from '../shared/UIElements/Modal'
import useFetchData     from '../shared/hooks/fetchData-hook'

import PersonName       from './PersonName'
import styles           from './ExpandedRoom.module.css'

const ExpandedRoom = ({ room, close, onDelete, userId }) => {
  const loadedData = useFetchData(
    `${process.env.REACT_APP_BACKEND_URL}/person/allByRoom/${room._id}`
  )
  const [showModal, setShowModal] = useState(false)
  
  const roomFocus = useRef(null)
  let people

  useEffect(() => {
    window.scrollTo({
      top:      roomFocus.current.offsetTop - 50,
      behavior: 'smooth',
    })
  }, [])

  const deleteRoomHandler = ( event ) => {
    event.preventDefault()
    onDelete(room._id)
    setShowModal(false)
  }

  const showDeleteRoomModal = () => {
    setShowModal(true)
  }

  const closeDeleteRoomModal = () => {
    setShowModal(false)
  }

  if (loadedData.data.length > 0) {
    people = loadedData.data.map((person) => {
      return (
        <PersonName
          valid={person.validity}
          name={person.name}
          key={person.id}
        />
      )
    })
  }

  return (
    <React.Fragment>
      <Modal
        show={showModal}
        onCancel={closeDeleteRoomModal}
        header="DELETE ROOM?"
        onSubmit={deleteRoomHandler}
      >
        <Button type="button" onClick={closeDeleteRoomModal} cancel>
          CANCEL
        </Button>
        <Button type="submit" onClick={deleteRoomHandler}>
          DELETE
        </Button>
      </Modal>
      <div ref={roomFocus} className={styles.roomCard}>
        <div onClick={close}>
          <h2 className={styles.roomTitle}>{room.roomName}</h2>
          {room.images.length > 0 ? (
            <Carousel controls={false} interval={3000} className={styles.caro}>
              {room.images.map((img) => {
                return (
                  <img
                    className={styles.roomImage}
                    src={img.url}
                    alt={img.public_id}
                    key={img.public_id}
                  />
                )
              })}
            </Carousel>
          ) : (
            <img
              className={styles.roomImage}
              src={
                // eslint-disable-next-line max-len
                'https://image.freepik.com/free-vector/lovely-living-room-interior_23-2147517931.jpg'
              }
              alt="room"
            />
          )}
          <div className={styles.peopleDiv}>{people}</div>
        </div>
        {userId && (
          <Button onClick={showDeleteRoomModal} danger className={styles.btn}>
            DELETE ROOM
          </Button>
        )}
      </div>
    </React.Fragment>
  )
}

export default ExpandedRoom
