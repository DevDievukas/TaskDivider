import {
  Form,
  Formik,
}             from 'formik'
import React  from 'react'


import Button from '../shared/FormElements/Button'
import Input  from '../shared/FormElements/Input'

import styles from './Form.module.css'

const RequestForm = (props) => {
  const { houseId, houseParam, postRequest } = props
  const initialAuthor = localStorage.getItem('houseItName')


  const formSubmit = (author, body) => {
    const request = {
      author,
      body,
      house: houseParam || houseId,
    }
    if (initialAuthor !== author) {
      localStorage.setItem('houseItName', author)
    }
    postRequest(request)
  }

  return (
    <Formik
      initialValues={{
        author: initialAuthor || '',
        body:   '',
      }}
      onSubmit={async ({ author, body }) => {
        formSubmit(author, body)
      }}
    >
      {() => (
        <Form className={styles.form}>
          <Input id="author" name="author" type="input" title="NAME" />
          <Input id="body" name="body" type="textarea" title="REQUEST"/>
          <Button type="submit" className={styles.button}>
            SUBMIT REQUEST
          </Button>
        </Form>
      )}
    </Formik>
  )

}

export default RequestForm
