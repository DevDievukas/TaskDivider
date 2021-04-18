import { Trash }       from 'phosphor-react'
import { useState }    from 'react'
import { useDispatch } from 'react-redux'
import { useParams }   from 'react-router'
import React           from 'react'

import { createForm }  from '../Form/thunks'
import { assign }      from '../strings/form'
import Button          from '../shared/FormElements/Button'
import Modal           from '../shared/UIElements/Modal'

import styles          from './PersonElement.module.css'
import RoomsModal      from './RoomsModal'

const PersonElement = ({ token, name, id, onDelete }) => {
  const dispatch = useDispatch()
  const houseParam = useParams().houseId
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  

  const callRoomsModal = () => {
    dispatch(createForm(
      <RoomsModal
        houseParam={houseParam}
        personId={id}
        token={token}
      />,
      assign
    ))
  }

  const revealDeleteModal = () => {
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
  }

  const deletePersonHandler = async (event) => {
    event.preventDefault()
    onDelete(id)
  }

  return (
    <React.Fragment>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteModal}
        header="Delete person"
        onSubmit={deletePersonHandler}
      >
        <Button onClick={closeDeleteModal} type="button" cancel>
          CANCEL
        </Button>
        <Button type="submit">DELETE</Button>
      </Modal>
      <li className={styles.personCard}>
        <p className={styles.title}>{name}</p>
        <p className={styles.rooms} onClick={callRoomsModal}>
          Rooms
        </p>
        <p>
          <Trash
            size={24}
            className={styles.deleteBtn}
            onClick={revealDeleteModal}
          />
        </p>
      </li>
    </React.Fragment>
  )
}

export default PersonElement
