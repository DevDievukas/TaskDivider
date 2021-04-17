export const SET_HOUSE = 'SET_HOUSE'
export const ADD_ANNOUNCEMENT = 'ADD_ANNOUNCEMENT'
export const ADD_PERSON = 'ADD_PERSON'
export const ADD_ROOM = 'ADD_ROOM'
export const ADD_REQUEST = 'ADD_REQUEST'

export const CLEAR_REQUESTS = 'CLEAR_REQUESTS'
export const CLEAR_HOUSE_DATA = 'CLEAR_HOUSE_DATA'

export const CHANGE_HOUSENAME = 'CHANGE_HOUSENAME'

export const REMOVE_ANNOUNCEMENT = 'REMOVE_ANNOUNCEMENT'
export const REMOVE_PERSON = 'REMOVE_PERSON'
export const REMOVE_REQUEST = 'REMOVE_REQUEST'
export const REMOVE_ROOM = 'REMOVE_ROOM'

export const addAnnouncement = (announcement) => {
  return {
    type: ADD_ANNOUNCEMENT,
    announcement,
  }
}

export const addPerson = (person) => {
  return {
    type: ADD_PERSON,
    person,
  }
}

export const addRequest = (request) => {
  return {
    type: ADD_REQUEST,
    request,
  }
}

export const addRoom = (room) => {
  return {
    type: ADD_ROOM,
    room,
  }
}

export const changeHouseName = (houseName) => {
  return {
    type: CHANGE_HOUSENAME,
    houseName,
  }
}

export const clearHouseData = () => {
  return {
    type: CLEAR_HOUSE_DATA,
  }
}

export const clearRequests = () => {
  return {
    type: CLEAR_REQUESTS,
  }
}


export const removeAnnouncement = (announcement) => {
  return {
    type: REMOVE_ANNOUNCEMENT,
    announcement,
  }
}

export const removePerson = (person) => {
  return {
    type: REMOVE_PERSON,
    person,
  }
}

export const removeRequest = (request) => {
  return {
    type: REMOVE_REQUEST,
    request,
  }
}

export const removeRoom = (room) => {
  return {
    type: REMOVE_ROOM,
    room,
  }
}

export const setHouse = (house) => {
  return {
    type:          SET_HOUSE,
    houseName:     house.houseName,
    announcements: house.announcements,
    people:        house.people,
    requests:      house.requests,
    rooms:         house.rooms,
    schedule:      house.schedule,
  }
}