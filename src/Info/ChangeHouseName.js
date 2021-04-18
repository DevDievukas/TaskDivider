import {
  Formik,
  Form,
}								 	      from 'formik'
import { useDispatch }  from 'react-redux'
import React 			      from 'react'

import { closeForm }    from '../Form/thunks'
import {
  createSuccessMessage,
}                       from '../Modal/thunks'
import { nameChanged }  from '../strings/success'
import usePostData 	    from '../shared/hooks/postData-hook'
import Button 		      from '../shared/FormElements/Button'
import Input 			      from '../shared/FormElements/Input'

const ChangeHouseName = ({ houseParam, setHouseName, token }) => {
  const { post } = usePostData()
  const dispatch = useDispatch()

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
        setHouseName(newHouseName)
        dispatch(closeForm())
        dispatch(createSuccessMessage(nameChanged))
      }
    )
  }

  return (
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
          <Input
            id='houseName'
            name='houseName'
            type='input'
            title='NEW HOUSE NAME'
          />
          <Button type='submit'>SUBMIT</Button>
        </Form>
      )}
    </Formik>
  )
}

export default ChangeHouseName