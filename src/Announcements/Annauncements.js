import {
  connect,
  useDispatch,
}                               from 'react-redux'
import { useParams }            from 'react-router'
import axios                    from 'axios'
import React                    from 'react'


import {
  createForm,
  closeForm,
}                               from '../Form/thunks'
import { addAnnouncement }      from '../House/actions'
import {
  createErrorMessage,
  createSuccessMessage
}                               from '../Modal/thunks'
import { announcementFailed }   from '../strings/error'
import { announcement }         from '../strings/form'
import { announcementCreated }  from '../strings/success'
import Button                   from '../shared/FormElements/Button'

import AnnouncementForm         from './AnnouncementForm'
import AnnouncementList         from './AnnouncementList'
import styles                   from './Announcements.module.css'

const Announcements = connect (({ auth: { userId, token }}) => (
  { userId, token }))(
  ({ userId, token }) => {
    const dispatch = useDispatch()
    const houseParam = useParams().houseId

    const createAnnouncement = (title, body, image) => {
      const announcement = {
        title,
        body,
        image,
        house: houseParam,
      }
      axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/announcement/`,
        announcement,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      ).then(res => {
        dispatch(closeForm())
        dispatch(addAnnouncement(res.data))
        dispatch(createSuccessMessage(announcementCreated))
      }).catch(() => {
        dispatch(createErrorMessage(announcementFailed))
      })
    }
  
    const callForm = () => {
      dispatch(createForm(
        <AnnouncementForm 
          createAnnouncementHandler={createAnnouncement}/>,
        announcement,
        token,
      ))
    }

    return (
      <div className={styles.announcementsDiv}>
        {userId ? (
          <Button onClick={callForm}>CREATE ANNOUNCEMENT</Button>
        ) : null}
        <ul className={styles.groupList}>
          <AnnouncementList />  
        </ul>
      </div>
    )
  }
)

export default Announcements
