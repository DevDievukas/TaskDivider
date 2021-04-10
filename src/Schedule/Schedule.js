import {
  useEffect,
  useState,
} 											from 'react'
import {
  connect,
  useDispatch,
} 											from 'react-redux'
import { useParams } 		from 'react-router-dom'
import axios 						from 'axios'
import React 						from 'react'

import { useLoadData } 	from '../shared/hooks/loadData-hook'
import { createError }	from '../Loading/thunks'
import Button 					from '../shared/FormElements/Button'
import EmptyData 				from '../shared/UIElements/EmptyData/EmptyData.tsx'
import Modal 						from '../shared/UIElements/Modal'

import GroupElement 		from './GroupElement'
import styles 					from './Schedule.module.css'

const Schedule = connect (({ auth: { houseId, token, userId }}) => (
  { houseId, token, userId}))(
  ({ houseId, token, userId }) => {
    const houseParam = useParams().houseId
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    const {nonArrayData, getData, dataLoaded} = useLoadData(
      `${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${
        houseParam || houseId
      }`
    )

    let schedule

    useEffect(() => {
      getData(
        `${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${
          houseParam || houseId
        }`
      )
    }, [])

    const closeGenerateModal = () => {
      setShowModal(false)
    }

    const openGenerateModal = () => {
      setShowModal(true)
    }

    const generateSchedule = (event) => {
      event.preventDefault()
      if (houseParam) {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/room/generateSchedule/`,
            {house: houseParam},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            closeGenerateModal()
            getData(
              `${process.env.REACT_APP_BACKEND_URL}/room/Schedule/${
                houseParam || houseId
              }`
            )
          })
          .catch((err) => {
            closeGenerateModal()
            if (err.response) {
              dispatch(createError(err.response.data.message))
            }
          })
      }
    }

    if (dataLoaded) {
      if (nonArrayData && !nonArrayData.message) {
        schedule = (
          <React.Fragment>
            <h2 className={styles.date}>{nonArrayData.date.split('T')[0]}</h2>
            <ul className={styles.groupList}>
              {nonArrayData.list.map((person) => {
                return (
                  <GroupElement
                    key={person.name}
                    id={person.name}
                    name={person.name}
                    rooms={person.rooms}
                  />
                )
              })}
            </ul>
          </React.Fragment>
        )
      } else {
        schedule = <EmptyData header='NO SCHEDULES!' />
      }
    }

    return (
      <div className={styles.scheduleDiv}>
        <Modal
          show={showModal}
          onCancel={closeGenerateModal}
          header='GENERATE SCHEDULE?'
          onSubmit={generateSchedule}
        >
          <Button type='button' onClick={closeGenerateModal} cancel>
					CANCEL
          </Button>
          <Button type='Submit'>GENERATE</Button>
        </Modal>
        {userId ? (
          <Button onClick={openGenerateModal} className={styles.generateBtn}>
					GENERATE SCHEDULE
          </Button>
        ) : null}
        {schedule}
      </div>
    )
  }
)

export default Schedule
