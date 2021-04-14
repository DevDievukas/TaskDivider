import { updateObject } from '../Store/utility'

import * as actionTypes from './actions'

const initialState = {
  houseName:     null,
  announcements: null,
  rooms:         null,
  people:        null,
  schedule:      null,
  requests:      null,
}

const addAnnouncement = (state, action) => {
  return updateObject(state, {
    announcements: [...state.announcements, action.announcement],
  })
}

const addPerson = (state, action) => {
  return updateObject(state, {
    people: [...state.people, action.person],
  })
}

const addRequest = (state, action) => {
  return updateObject(state, {
    requests: [...state.requests, action.request],
  })
}

const addRoom = (state, action) => {
  return updateObject(state, {
    rooms: [...state.rooms, action.room],
  })
}

const changeHouseName = (state, action) => {
  return updateObject(state, {
    houseName: action.houseName,
  })
}

const clearHouseData = () => {
  return {
    state: initialState,
  }
}

const clearRequests = (state) => {
  return updateObject(state, {
    requests: null,
  })
}

const removeAnnouncement = (state, action) => {
  return updateObject(state, {
    announcements: state.announcements.filter(announcement =>
      announcement._id !== action.announcement
    ),
  })
}

const removePerson = (state, action) => {
  return updateObject(state, {
    people: state.people.filter(person =>
      person._id !== action.person
    ),
  })
}

const removeRequest = (state, action) => {
  return updateObject(state, {
    requests: state.requests.filter(request =>
      request._id !== action.request
    ),
  })
}

const removeRoom = (state, action) => {
  return updateObject(state, {
    rooms: state.rooms.filter(room =>
      room._id !== action.room
    ),
  })
}

const setHouse = (state, action) => {
  return updateObject(state, {
    houseName:     action.houseName,
    announcements: action.announcements,
    people:        action.people,
    requests:      action.requests,
    rooms:         action.rooms,
    schedule:      action.schedule,
  })
}

const houseReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.ADD_ANNOUNCEMENT:
    return addAnnouncement(state, action)
  case actionTypes.ADD_PERSON:
    return addPerson(state, action)
  case actionTypes.ADD_REQUEST:
    return addRequest(state, action)
  case actionTypes.ADD_ROOM:
    return addRoom(state, action)
  case actionTypes.CHANGE_HOUSENAME:
    return changeHouseName(state, action)
  case actionTypes.CLEAR_HOUSE_DATA:
    return clearHouseData()
  case actionTypes.CLEAR_REQUESTS:
    return clearRequests(state)
  case actionTypes.REMOVE_ANNOUNCEMENT:
    return removeAnnouncement(state, action)
  case actionTypes.REMOVE_PERSON:
    return removePerson(state, action)
  case actionTypes.REMOVE_REQUEST:
    return removeRequest(state, action)
  case actionTypes.REMOVE_ROOM:
    return removeRoom(state, action)
  case actionTypes.SET_HOUSE:
    return setHouse(state, action)
  default: 
    return state
  }
}

export default houseReducer