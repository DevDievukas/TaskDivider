import axios                  from 'axios'
import { 
  useEffect,
  useState,
}                    					from 'react'
import { connect, useDispatch } 				from 'react-redux'
import {
  useParams,
} 														from 'react-router-dom'
import React 									from 'react'

import { createError }        from '../Loading/thunks'

import {
  HouseName,
  Inner,
  Main,
}                             from './styled'
import ChangeHouseName        from './ChangeHouseName'
import ChangeOwner 						from './ChangeOwner'
import ChangePassword         from './ChangePassword'
import DeleteHouse            from './DeleteHouse'


const Info = connect (({ auth: { token }}) => (
  { token }))(
  ({ token }) => {
    const [showChangeOwner, setShowChangeOwner] = useState(false)
    const [showChangeHousename, setShowChangeHousename] = useState(false)
    const [showChangePassword, setShowPassword] = useState(false)
    const [showDeleteHouse, setShowDeleteHouse] = useState(false)
    const [houseName, setHouseName] = useState('')
    const [roomNumber, setRoomNumber] = useState('')
    const [peopleNumber, setPeopleNumber] = useState('')
    const houseParam = useParams().houseId
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
            dispatch(createError('COULD NOT FETCH HOUSE DATA'))
          }
        })
    }, [])

    return (
      <Main>
        <ChangeOwner
          show={showChangeOwner}
          cancel={() => setShowChangeOwner(false)}
          token={token}
        />
        <ChangeHouseName 
          show={showChangeHousename}
          cancel={() => setShowChangeHousename(false)}
          setHouseName={setHouseName}
          token={token}
        />
        <ChangePassword 
          show={showChangePassword}
          cancel={() => setShowPassword(false)}
          token={token}
        />
        <DeleteHouse 
          show={showDeleteHouse}
          cancel={() => setShowDeleteHouse(false)}
          token={token}
        />
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
        <p onClick={() => setShowDeleteHouse(true)}>Delete house</p>
      </Main>
    )
  }
)
export default Info
