import axios            from 'axios'
import {
  Formik,
  Form,
}								 	      from 'formik'              
import { 
  useDispatch,
}                       from 'react-redux'
import {
  useHistory,
}                       from 'react-router-dom'
import React 			      from 'react'

import { closeForm }    from '../Form/thunks'
import { createError }  from '../Loading/thunks'
import {
  createSuccessMessage,
}                       from '../Modal/thunks'
import { houseDeleted } from '../strings/success'
import Button 		      from '../shared/FormElements/Button'
import Input 			      from '../shared/FormElements/Input'

const DeleteHouse = ({ houseParam, token }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const deleteSuccess = () => {
    history.push('/')
  }

  const deleteHouseHandler = (password) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/house/`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        data: {
          password,
          houseId: houseParam,
        },
      }).then(() => {
      dispatch(closeForm())
      dispatch(createSuccessMessage(houseDeleted))
      deleteSuccess()
    }).catch(() => {
      dispatch(createError('Deleting house failed'))
    })
  }


  return (
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={(values) => {
        deleteHouseHandler(values.password)
      }}
    >
      {() => (
        <Form>
          <Input
            id='password'
            name='password'
            type='password'
            title='HOUSE PASSWORD'
          />
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
}

export default DeleteHouse