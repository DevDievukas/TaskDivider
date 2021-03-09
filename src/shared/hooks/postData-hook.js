import {useDispatch} from 'react-redux'
import axios from 'axios'
import {
	stopLoading,
	startLoading,
	createError,
} from '../../Store/actions/Loading'

const usePostData = () => {
	const dispatch = useDispatch()
	const post = (url, headers, createdData, method) => {
		dispatch(startLoading())
		axios
			.post(url, createdData, headers)
			.then((res) => {
				dispatch(stopLoading())
				// console.log(res.data);
				method(res.data)
			})
			.catch((err) => {
				dispatch(createError(err.message))
			})
	}
	return {post}
}

export default usePostData