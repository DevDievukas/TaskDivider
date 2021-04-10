
import { connect }      from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
}                       from 'react-router-dom'
import React            from 'react'


import Announcements    from '../Announcements/Annauncements'
import Auth             from '../Auth/Auth'
import Houses           from '../House/Houses'
import Info             from '../Info/Info'
import People           from '../People/People'
import Rooms            from '../Rooms/Rooms'
import HouseNavbar      from '../shared/Navbar/HouseNavbar'
import Schedule         from '../Schedule/Schedule'
import SharedItems      from '../SharedItems/SharedItems'

const Routes = connect (({ auth: { houseId, userId }}) => (
  { houseId, userId }))(
  ({ houseId, userId }) => {

    let routes;
    if (userId) {
      routes = (
        <Switch>
          <Route path="/:houseId/Schedule" exact>
            <HouseNavbar />
            <Schedule />
          </Route>
          <Route path="/" exact>
            <Houses />
          </Route>
          <Route path="/:houseId/announcements" exact>
            <HouseNavbar />
            <Announcements />
          </Route>
          <Route path="/:houseId/shareditems" exact>
            <HouseNavbar />
            <SharedItems />
          </Route>
          <Route path="/:houseId/rooms" exact>
            <HouseNavbar />
            <Rooms />
          </Route>
          <Route path="/:houseId/people" exact>
            <HouseNavbar />
            <People />
          </Route>
          <Route path="/:houseId/info" exact>
            <HouseNavbar />
            <Info />
          </Route>
          <Redirect to="/" />
        </Switch>
      )
    } else if (houseId) {
      routes = (
        <Switch>
          <Route path="/schedule" exact>
            <Schedule />
          </Route>
          <Route path="/" exact>
            <Announcements />
          </Route>
          <Route path="/shareditems" exact>
            <SharedItems />
          </Route>
          <Route path="/rooms" exact>
            <Rooms />
          </Route>
          <Route path="/people" exact>
            <People />
          </Route>
          <Redirect to="/" />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      )
    }
    return routes
  }
)

export default Routes;