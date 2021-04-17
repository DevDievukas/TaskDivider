import React        from 'react'

import EmptyData    from '../shared/UIElements/EmptyData/EmptyData'

import HouseCard 		from './HouseCard'

export default (props) => {
  const { loadedData } = props
  
  if (loadedData.dataLoaded) {
    if (loadedData.data.length > 0) {
      return loadedData.data.map(({houseName, _id}) => {
        return (
          <HouseCard
            houseName={houseName}
            key={_id}
            houseId={_id}
          />
        )
      })
    } else {
      return <EmptyData header="NO HOUSES! WOULD YOU LIKE TO CREATE ONE?" />
    }
  } else {
    return null
  }
}
