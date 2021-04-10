import {
  SignOut,
  House
}                       from 'phosphor-react'
import {
  connect,
  useDispatch,
}                       from 'react-redux'
import { useHistory }   from 'react-router-dom'
import React            from 'react'
import styled           from 'styled-components'

import { startLogout }  from '../../Auth/thunks'

import Link             from './Link'
import styles           from './Navbar.module.css'

const Navigation = styled.header`
  background-color: ${(props) => props.theme.charcoal};
`

const Navbar = connect (({ auth: { houseId, houseName, token, userId }}) => (
  { houseId, houseName, token, userId }))(
  ({ houseId, houseName, token, userId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    let leftButton

    const redirectLogout = () => {
      dispatch(startLogout())
      history.push('/')
    }

    let linkDirection = '/'
    if (userId) {
      leftButton = <House className={styles.logo} size={42} />
    }
    let rightButton = (
      <div className={styles.signOutDiv}>
        <SignOut size={35} />
        <h5 onClick={redirectLogout}>SIGN OUT</h5>
      </div>
    )

    if (houseId) {
      leftButton = <h3 className={styles.logoText}>{houseName}</h3>
    }

    const navbar = (
      <Navigation className={styles.navbar}>
        <Link styles={styles.navbarBrand} direction={`${linkDirection}`}>
          {leftButton}
        </Link>
        {token ? rightButton : null}
      </Navigation>
    )

    return navbar
  }
)

export default Navbar
