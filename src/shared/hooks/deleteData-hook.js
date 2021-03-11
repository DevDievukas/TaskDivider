import { useDispatch } 	from 'react-redux'
import axios 						from 'axios'

import { createError } 		from '../../Store/actions/Loading'


export default () => {
	const dispatch = useDispatch()
	const deleteData = (url, headers, id, method) => {
		axios
			.delete(url + id, headers)
			.then((res) => {
				method()
			})
			.catch((err) => {
				dispatch(createError(err.message))
			})
	}
	return {deleteData}
}

