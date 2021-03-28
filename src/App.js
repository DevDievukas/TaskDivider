import {
  useEffect
}                             from 'react'
import {
  useDispatch,
  useSelector,
  shallowEqual,
}                             from 'react-redux'
import {
  BrowserRouter as Router
}                             from 'react-router-dom'
import React                  from 'react'

import {
  authFromLocalStorage,
}                             from './Auth/thunks'
import { setHouseFromLocal }  from './House/thunks'
import { clearError }         from './Loading/thunks'

import FormModal              from './Form/Modal'
import Modal                  from './Modal/Modal'
import Routes                 from './Routes/Routes'
import ErrorModal             from './shared/UIElements/ErrorModal'
import HouseNavbar            from './shared/Navbar/HouseNavbar'
import Navbar                 from './shared/Navbar/Navbar'
import Spinner                from './shared/Spinner/Spinner'


const App = () => {
  const houseId = useSelector((state) =>
    (state.auth.houseId),
  shallowEqual
  );
  const isLoading = useSelector((state) =>
    (state.loading.isLoading),
  shallowEqual
  );
  const error = useSelector((state) =>
    (state.loading.error),
  shallowEqual
  );
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authFromLocalStorage())
    dispatch(setHouseFromLocal())
  }, [dispatch])


  return (
    <Router>
      <Navbar />
      {houseId ? <HouseNavbar /> : null}
      <Modal />
      <FormModal />
      <ErrorModal error={error} onClear={() => dispatch(clearError())} />
      {isLoading && <Spinner asOverlay />}
      <Routes />
    </Router>
  )
}

export default App
