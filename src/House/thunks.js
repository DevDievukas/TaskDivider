import { setHouse } from './actions'


export const setHouseHandler = (house) => {
  return dispatch => {
    dispatch(setHouse(house))
    localStorage.setItem('houseData',
      JSON.stringify({
        houseName: house.houseName,
        announcements: house.announcements,
        people: house.people,
        requests: house.requests,
        rooms: house.rooms,
        schedule: house.schedule,
      })
    )
  }
}

export const setHouseFromLocal = () => {
  return dispatch => {
    const storedHouseData = JSON.parse(localStorage.getItem('houseData'))
    if (storedHouseData) {
      const house = {
        houseName: storedHouseData.houseName,
        announcements: storedHouseData.announcements,
        people: storedHouseData.people,
        requests: storedHouseData.requests,
        rooms: storedHouseData.rooms,
        schedule: storedHouseData.schedule,
      }
      dispatch(setHouseHandler(house))
    }
  }
}
