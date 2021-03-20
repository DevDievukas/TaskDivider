import axios            from 'axios'
import {
  Formik,
  Form
}								 	      from 'formik'              
import { 
  useDispatch,
  useSelector,
}                       from 'react-redux'
import {
  useParams,
  useHistory,
}                       from 'react-router-dom'
import React 			      from 'react'

import { createError }  from '../Loading/thunks'
import Button 		      from '../shared/FormElements/Button'
import Input 			      from '../shared/FormElements/Input'
import FormModal 	      from '../shared/UIElements/FormModal/FormModal'

const DeleteHouse = (props) => {
  const { token } = useSelector(state => ({ ...state.auth }))
  const dispatch = useDispatch()
  const history = useHistory()
  const houseParam = useParams().houseId

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
          houseId: houseParam
        }
      }).then(() => {
      deleteSuccess()
    }).catch(() => {
      dispatch(createError('Deleting house failed'))
    })
  }


  const form = (
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
          <Input id='password' name='password' type='password' title='HOUSE PASSWORD' />
          <Button type='button' cancel onClick={props.cancel}>
						CANCEL
          </Button>
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
  return (
    <FormModal
      onCancel={props.cancel}
      header='DELETE HOUSE?'
      show={props.show}
      form={form}
    />
  )
}

export default DeleteHouse