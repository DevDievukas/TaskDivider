import { useState } 	from 'react'
import {
	useSelector,
	useDispatch,
} 										from 'react-redux'
import { useParams }	from 'react-router-dom'
import axios 					from 'axios'
import React 					from 'react'

import {
	createError,
	startLoading,
	stopLoading,
} 										from '../Store/actions/Loading'
import Button 				from '../shared/FormElements/Button'
import EmptyData 			from '../shared/UIElements/EmptyData/EmptyData'
import Modal 					from '../shared/UIElements/Modal'
import useDeleteData 	from '../shared/hooks/deleteData-hook'
import useFetchData 	from '../shared/hooks/fetchData-hook'
import usePostData 		from '../shared/hooks/postData-hook'

import Form 					from './Form'
import ItemsList 			from './ItemsList'
import styles 				from './SharedItems.module.css'



const SharedItems = () => {
	const {token, userId, houseId} = useSelector((state) => ({
		...state.auth,
	}))
	const dispatch = useDispatch()
	const loadedData = useFetchData(
		`${process.env.REACT_APP_BACKEND_URL}/request/allByHouseId/${
			houseParam || houseId
		}`
		)
		const { post } = usePostData()
		const { deleteData } = useDeleteData()
		const [showModalClear, setShowModalClear] = useState(false)
		const houseParam = useParams().houseId

	const closeClearRequestsModal = () => {
		setShowModalClear(false)
	}

	const openClearRequestsModal = () => {
		setShowModalClear(true)
	}

	const deleteRequestHandler = (requestId) => {
		const deleteFilter = () => {
			loadedData.setData((prevData) =>
				prevData.filter((element) => element._id !== requestId)
			)
		}
		deleteData(
			`${process.env.REACT_APP_BACKEND_URL}/request/`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: {
					house: houseParam,
				},
			},
			requestId,
			deleteFilter
		)
	}

	const postRequestHandler = (request) => {
		const addFilter = (res) => {
			if (loadedData.data) {
				loadedData.setData((prevData) => [...prevData, res])
			} else {
				loadedData.setData([res])
			}
		}
		post(
			`${process.env.REACT_APP_BACKEND_URL}/request`,
			null,
			request,
			addFilter
		)

		// postData(`${process.env.REACT_APP_BACKEND_URL}/request`, null, request);
	}

	const clearRequestsSubmitHandler = (event) => {
		event.preventDefault()
		dispatch(startLoading())
		axios
			.delete(`${process.env.REACT_APP_BACKEND_URL}/request/delete/all`, {
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: {
					house: houseParam,
				},
			})
			.then((res) => {
				setShowModalClear(false)
				dispatch(stopLoading())
				loadedData.setData([])
			})
			.catch((err) => {
				dispatch(createError(err.message))
			})
	}

	return (
		<div className={styles.requestDiv}>
			<Modal
				show={showModalClear}
				onCancel={closeClearRequestsModal}
				header='DELETE ALL REQUESTS?'
				onSubmit={clearRequestsSubmitHandler}
			>
				<Button onClick={closeClearRequestsModal} type='button' cancel>
					CANCEL
				</Button>
				<Button type='submit'>CLEAR</Button>
			</Modal>
			<div className={styles.formDiv}>
				<Form
					houseId={houseId}
					houseParam={houseParam}
					postRequest={postRequestHandler}
				/>
				{userId ? (
					<Button onClick={openClearRequestsModal} className={styles.clearBtn}>
						DELETE REQUESTS
					</Button>
				) : null}
			</div>
			{loadedData.data.length > 0 && loadedData.dataLoaded ? (
				<ItemsList
					data={loadedData.data}
					deleteRequest={deleteRequestHandler}
					userId={userId}
				/>
			) : (
				loadedData.dataLoaded && <EmptyData header='NO REQUEST ACTIVE' />
			)}
		</div>
	)
}

export default SharedItems
