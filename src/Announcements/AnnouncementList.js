import React            from 'react'

import EmptyData        from '../shared/UIElements/EmptyData/EmptyData'

import AnnouncementItem from './AnnouncementItem'
import { connect } from 'react-redux'

export default connect (({ house: { announcements } }) => (
  { announcements }))(
  ({ announcements }) => {
    if (announcements){
      if (announcements.length > 0) {
        return announcements.reverse().map((ann) => {
          return (
            <AnnouncementItem
              key={ann._id}
              title={ann.title}
              text={ann.body}
              img={ann.image}
              link={ann.link}
              date={ann.date}
            />
          )
        })
      } else {
        return <EmptyData header="NO ANNOUNCEMENTS!" />
      }
    } else {
      return null
    }
  }
)