import axios                  from 'axios'
import { 
  useEffect,
  useState,
}                    					from 'react'
import {
  connect,
  useDispatch,
}                      				from 'react-redux'
import {
  useParams,
} 														from 'react-router-dom'
import React 									from 'react'

import { createForm }         from '../Form/thunks'
import { createError }        from '../Loading/thunks'
import {
  changeHousename,
  changeOwner,
  changePassword,
  deleteHouse,
}                             from '../strings/form'

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

    const callDeleteHouse = () => {
      dispatch(createForm(
        <DeleteHouse
          token={token}
          houseParam={houseParam}
        />,
        deleteHouse,
      ))
    }

    const callChangeHousename = () => {
      dispatch(createForm(
        <ChangeHouseName
          token={token}
          houseParam={houseParam}
          setHouseName={setHouseName}
        />,
        changeHousename,
      ))
    }

    const callChangeOwner = () => {
      dispatch(createForm(
        <ChangeOwner
          token={token}
          houseParam={houseParam}
        />,
        changeOwner,
      ))
    }

    const callChangePassword = () => {
      dispatch(createForm(
        <ChangePassword
          token={token}
          houseParam={houseParam}
        />,
        changePassword,
      ))
    }

    return (
      <Main>
        <HouseName>{houseName}</HouseName>
        <Inner>
          <p>Residents:</p>
          <p>{peopleNumber}</p>
        </Inner>
        <Inner>
          <p>Rooms:</p>
          <p>{roomNumber}</p>
        </Inner>
        <p onClick={() => callChangeHousename()}>Change house name</p>
        <p onClick={() => callChangePassword()}>Change password</p>
        <p onClick={() => callChangeOwner()}>Change owner</p>
        <p onClick={() => callDeleteHouse()}>Delete house</p>
      </Main>
    )
  }
)
export default Info
