import {
  useEffect
}                   from 'react'
import {
  useDispatch,
  useSelector
}                   from 'react-redux'
import {
  BrowserRouter as Router
}                   from 'react-router-dom'
import React        from 'react'

import {
  authFromLocalStorage,
}                     from './Auth/thunks'
import { clearError } from './Loading/thunks'

import ErrorModal     from './shared/UIElements/ErrorModal'
import HouseNavbar    from './shared/Navbar/HouseNavbar'
import Navbar         from './shared/Navbar/Navbar'
import Spinner        from './shared/Spinner/Spinner'

import Routes         from './Routes/Routes'
import SuccessModal   from './Success/SuccessModal'

const App = () => {
  const { houseId} = useSelector((state) => ({
    ...state.auth,
  }))
  const { isLoading, error } = useSelector((state) => ({ ...state.loading }))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authFromLocalStorage())
  }, [dispatch])


  return (
    <Router>
      <Navbar />
      {houseId ? <HouseNavbar /> : null}
      <SuccessModal />
      <ErrorModal error={error} onClear={() => dispatch(clearError())} />
      {isLoading && <Spinner asOverlay />}
      <Routes />
    </Router>
  )
}

export default App
