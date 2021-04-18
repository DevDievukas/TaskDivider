import {
  Form,
  Field,
  Formik,
} 										from 'formik'
import React 					from 'react'

import Button 				from '../shared/FormElements/Button'
import Input 					from '../shared/FormElements/Input'

import styles 				from './PeopleControl.module.css'

const PeopleForm = (props) => {
  const { createPerson, roomData } = props
  let roomsCheckbox

  if (roomData.length > 0) {
    roomsCheckbox = roomData.map((room) => {
      return (
        <label key={room._id}>
          <Field type='checkbox' name='rooms' value={room._id} />{' '}
          {room.roomName}
        </label>
      )
    })
  }

  return (
    <Formik
      initialValues={{
        name:  '',
        rooms: [],
      }}
      onSubmit={async ({name, rooms}) => {
        createPerson(name, rooms)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id='name' name='name' type='input' title='NAME' />
          <h6>Assign Rooms</h6>
          <div className={styles.checkBoxDiv}>{roomsCheckbox}</div>

          <div className={styles.buttonsDiv}>
            <Button type='submit' className={styles.button}>
							CREATE!
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default PeopleForm
