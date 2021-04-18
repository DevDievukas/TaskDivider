import {
  Form,
  Formik,
} 										from 'formik'
import React 					from 'react'

import Button 				from '../shared/FormElements/Button'
import ImageUpload 		from '../shared/FormElements/ImageUpload'
import Input 					from '../shared/FormElements/Input'

import styles 				from './RoomsControl.module.css'

const RoomsForm = ({ createRoom }) => {

  return(
    <Formik
      initialValues={{
        roomName: '',
        image:    null,
      }}
      onSubmit={async ({ roomName, image}) => {
        createRoom(roomName, image)
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.form}>
          <Input
            id='roomName'
            name='roomName'
            type='input'
            title='ROOM NAME'
          />
          <ImageUpload
            id='image'
            center
            multiple
            className={styles.imgUpload}
            setFiles={(event) => {
              setFieldValue('image', event.currentTarget.files)
            }}
          />
          <Button type='submit' className={styles.button}>
							CREATE!
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default RoomsForm
