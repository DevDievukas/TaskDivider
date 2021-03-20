import {
  Formik,
  Form
}								 	  from 'formik'  
import { 
  useSelector,
}                   from 'react-redux'
import {
  useParams,
}                   from 'react-router-dom'
import React 			  from 'react'

import usePostData 	from '../shared/hooks/postData-hook'
import Button 		  from '../shared/FormElements/Button'
import Input 			  from '../shared/FormElements/Input'
import FormModal 	  from '../shared/UIElements/FormModal/FormModal'

const ChangeHouseName = (props) => {
  const { post } = usePostData()
  const { token } = useSelector(state => ({ ...state.auth }))
  const houseParam = useParams().houseId

  const changeHouseNameHandler = (newHouseName) => {
    const reqData = {
      houseId: houseParam,
      newHouseName,
    }

    post(
      `${process.env.REACT_APP_BACKEND_URL}/house/changehousename`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
      reqData,
      () => {
        props.cancel()
      }
    )

  }

  const form = (
    <Formik
      initialValues={{
        houseName: '',
      }}
      onSubmit={async (values) => {
        changeHouseNameHandler(values.houseName)
      }}
    >
      {() => (
        <Form>
          <Input id='houseName' name='houseName' type='input' title='NEW HOUSE NAME' />
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
      header='CHANGE NAME OF THE HOUSE?'
      show={props.show}
      form={form}
    />
  )
}

export default ChangeHouseName