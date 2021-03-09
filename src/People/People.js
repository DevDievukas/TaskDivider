import React from 'react'
import {useParams} from 'react-router-dom'
import usePostData from '../shared/hooks/postData-hook'
import useFetchData from '../shared/hooks/fetchData-hook'
import useDeleteData from '../shared/hooks/deleteData-hook'

import PeopleControl from './PeopleControl'
import EmptyData from '../shared/UIElements/EmptyData/EmptyData.tsx'

import styles from './People.module.css'
import PersonElement from './PersonElement'
import {useSelector} from 'react-redux'

const People = () => {
	const houseParam = useParams().houseId
	const {userId, token} = useSelector((state) => ({
		...state.auth,
	}))
	const loadedData = useFetchData(
		`${process.env.REACT_APP_BACKEND_URL}/person/allByHouse/${houseParam}`
	)
	const roomsData = useFetchData(
		`${process.env.REACT_APP_BACKEND_URL}/room/allByHouse/${houseParam}`
	)

	const {post} = usePostData()
	const {deleteData} = useDeleteData()
	let people = null

	const PersonDeleteHandler = (personId) => {
		const deleteFilter = () => {
			loadedData.setData((prevData) =>
				prevData.filter((element) => element._id !== personId)
			)
		}
		deleteData(
			`${process.env.REACT_APP_BACKEND_URL}/person/`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
				data: {
					house: houseParam,
				},
			},
			personId,
			deleteFilter
		)
	}

	const createPersonHandler = (person) => {
		const addFilter = (res) => {
			if (loadedData.data) {
				loadedData.setData((prevData) => [...prevData, res])
			} else {
				loadedData.setData([res])
			}
		}
		post(
			`${process.env.REACT_APP_BACKEND_URL}/person/`,
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			},
			person,
			addFilter
		)
	}
	if (loadedData.dataLoaded) {
		if (loadedData.data.length > 0) {
			people = loadedData.data.map((person) => {
				return (
					<PersonElement
						key={person._id}
						id={person._id}
						name={person.name}
						rooms={person.rooms}
						onDelete={PersonDeleteHandler}
						token={token}
						userId={userId}
					/>
				)
			})
		} else {
			people = <EmptyData header='NO PEOPLE!' />
		}
	}

	return (
		<div className={styles.mainDiv}>
			{userId ? (
				<PeopleControl
					createPerson={createPersonHandler}
					roomData={roomsData.data}
					token={token}
				/>
			) : null}
			<ul className={styles.groupList}>{people}</ul>
		</div>
	)
}

export default People
