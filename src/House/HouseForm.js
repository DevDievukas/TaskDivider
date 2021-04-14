
import {
  Formik,
}											 	from 'formik'
import React 						from 'react'

import Button 					from '../shared/FormElements/Button'
import Input 						from '../shared/FormElements/Input'
import { Form }         from '../shared/styled-components/shared'

const HouseForm = (props) => {
  const { createHouseHandler } = props

  return (
    <Formik
      initialValues={{
        houseName: '',
        password:  '',
      }}
      onSubmit={async (values) => {
        createHouseHandler(values.houseName, values.password)
      }}
      render={({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.houseName}
            name='houseName'
            type='input'
            placeholder='NAME OF THE HOUSE'
            id='houseName'
            title='NAME OF THE HOUSE'
          />
          <Input
            id='password'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name='password'
            type='password'
            placeholder='EMAIL-PASSWORD'
            title='EMAIL-PASSWORD'
          />
          <Button type='submit'>
							ADD!
          </Button>
        </Form>
      )}
    />
  )
}

export default HouseForm