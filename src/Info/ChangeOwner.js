import {
	Formik,
	Form
}								 	from 'formik'
import React 			from 'react'

import Button 		from '../shared/FormElements/Button'
import Input 			from '../shared/FormElements/Input'
import FormModal 	from '../shared/UIElements/FormModal/FormModal'

export default (props) => {
	const form = (
		<Formik
			initialValues={{
				email: '',
			}}
			onSubmit={async (values) => {
				props.changeOwner({email: values.email})
			}}
		>
			{() => (
				<Form>
					<Input id='email' name='email' type='input' title='E-MAIL' />
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
			header='CHANGE OWNER?'
			show={props.show}
			form={form}
		/>
	)
}
