import axios                  from 'axios'
import { 
  useEffect,
  useState,
}                    					from 'react'
import { useDispatch } 				from 'react-redux'
import { useSelector } 				from 'react-redux'
import {
  useParams,
  useHistory
} 														from 'react-router-dom'
import React 									from 'react'

import { startRefreshToken } 	from '../Auth/thunks'
import usePostData 						from '../shared/hooks/postData-hook'
import Button 								from '../shared/FormElements/Button'
import Modal 									from '../shared/UIElements/Modal'

import {
  HouseName,
  Inner,
  Main,
}                             from './styled'
import ChangeHouseName        from './ChangeHouseName'
import ChangeOwner 						from './ChangeOwner'
import ChangePassword         from './ChangePassword'


const Info = () => {
  const [showChangeOwner, setShowChangeOwner] = useState(false)
  const [showChangeHousename, setShowChangeHousename] = useState(false)
  const [showChangePassword, setShowPassword] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [houseName, setHouseName] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [peopleNumber, setPeopleNumber] = useState('')
  const [message, setMessage] = useState()
  const { token } = useSelector((state) => ({ ...state.auth }))
  const { post } = usePostData()
  const dispatch = useDispatch()


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/house/info/${houseParam}`)
      .then((res) => {
        setHouseName(res.data.houseName)
        setRoomNumber(res.data.roomNumber)
        setPeopleNumber(res.data.peopleNumber)
      })
      .catch((error) => {
        if (error.response) {
          // dispatch(createError(error.response.data.message))
        }
      })
  })

  const houseParam = useParams().houseId
  const history = useHistory()

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
      <ChangeHouseName 
        show={showChangeHousename}
        cancel={() => setShowChangeHousename(false)}
        setHouseName={setHouseName}
      />
      <ChangePassword 
        show={showChangePassword}
        cancel={() => setShowPassword(false)}
        setMessage={setMessage}
      />
      <Modal
        show={showSuccessModal}
        onCancel={closeSuccessModal}
        header={message}
        onSubmit={closeSuccessModal}
      >
        <Button>OK</Button>
      </Modal>
      <HouseName>{houseName}</HouseName>
      <Inner>
        <p>Residents:</p>
        <p>{peopleNumber}</p>
      </Inner>
      <Inner>
        <p>Rooms:</p>
        <p>{roomNumber}</p>
      </Inner>
      <p onClick={() => setShowChangeHousename(true)}>Change house name</p>
      <p onClick={() => setShowPassword(true)}>Change password</p>
      <p onClick={() => setShowChangeOwner(true)}>Change owner</p>
    </Main>
  )
}

export default Info
