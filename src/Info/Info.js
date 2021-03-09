import React, {useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {startRefreshToken} from '../Store/actions/Auth'
import usePostData from '../shared/hooks/postData-hook'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import ChangeOwner from './ChangeOwner'
import Button from '../shared/FormElements/Button'
import Modal from '../shared/UIElements/Modal'

const Main = styled.div`
	width: 80%;
	margin: auto;
	margin-top: 1.2em;
`

const Inner = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: auto;
`

const HouseName = styled.h4`
	text-align: center;
	margin-bottom: 1.2em;
`

const Info = () => {
	const [showChangeOwner, setShowChangeOwner] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)
	const [message, setMessage] = useState()
	const {token} = useSelector((state) => ({...state.auth}))
	const dispatch = useDispatch()
	const houseParam = useParams().houseId
	const history = useHistory()
	const {post} = usePostData()

	const closeSuccessModal = () => {
		setShowSuccessModal(false)
		history.push('/')
	}

	const changeOwnerHandler = (newOwner) => {
		const reqData = {
			email: newOwner.email,
			houseId: houseParam,
		}
		post(
			`${process.env.REACT_APP_BACKEND_URL}/house/changeowner`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
			reqData,
			(res) => {
				setMessage(res.message)
				setShowChangeOwner(false)
				setShowSuccessModal(true)
				dispatch(startRefreshToken(res.token))
			}
		)
	}

	return (
		<Main>
			<ChangeOwner
				show={showChangeOwner}
				cancel={() => setShowChangeOwner(false)}
				changeOwner={changeOwnerHandler}
			/>
			<Modal
				show={showSuccessModal}
				onCancel={closeSuccessModal}
				header={message}
				onSubmit={closeSuccessModal}
			>
				<Button>OK</Button>
			</Modal>
			<HouseName>Swalmen</HouseName>
			<Inner>
				<p>Residents:</p>
				<p>6</p>
			</Inner>
			<Inner>
				<p>Rooms:</p>
				<p>7</p>
			</Inner>
			<p>Change house name</p>
			<p>Change password</p>
			<p onClick={() => setShowChangeOwner(true)}>Change owner</p>
		</Main>
	)
}

export default Info
