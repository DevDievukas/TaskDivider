import {
  Form,
  Formik,
} 										from 'formik'
import { useState }  	from 'react'
import { useParams } 	from 'react-router-dom'
import React 					from 'react'

import Button 				from '../shared/FormElements/Button'
import FormModal 			from '../shared/UIElements/FormModal/FormModal'
import ImageUpload 		from '../shared/FormElements/ImageUpload'
import Input 					from '../shared/FormElements/Input'

import styles 				from './RoomsControl.module.css'

const RoomsControl = (props) => {
  const [showModal, setShowModal] = useState(false)
	
  const houseParam = useParams().houseId
  const { createRoom } = props

  const revealAddRoomModal = () => {
    setShowModal(true)
  }

  const closeAddRoomModal = () => {
    setShowModal(false)
  }

  const addRoomSubmitHandler = (roomName, images) => {
    const formData = new FormData()
    formData.append('roomName', roomName)
    formData.append('house', houseParam)
    Object.values(images).forEach((img) => {
      formData.append('images', img)
    })
    createRoom(formData)
    setShowModal(false)
  }

  const form = (
    <Formik
      initialValues={{
        roomName: '',
        image: null,
      }}
      onSubmit={async (values) => {
        addRoomSubmitHandler(values.roomName, values.image)
      }}
    >
      {({setFieldValue}) => (
        <Form className={styles.form}>
          <Input id='roomName' name='roomName' type='input' title='ROOM NAME' />
          <ImageUpload
            id='image'
            center
            className={styles.imgUpload}
            setFiles={(event) => {
              setFieldValue('image', event.currentTarget.files)
            }}
          />
          <div className={styles.buttonsDiv}>
            <Button
              type='button'
              cancel
              className={styles.button}
              onClick={closeAddRoomModal}
            >
							CANCEL
            </Button>
            <Button type='submit' className={styles.button}>
							CREATE!
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )

  return (
    <React.Fragment>
      <FormModal
        onCancel={closeAddRoomModal}
        header='ADD ROOM?'
        show={showModal}
        form={form}
      />
      <Button add onClick={revealAddRoomModal} className={styles.btn} />
    </React.Fragment>
  )
}

export default RoomsControl
