import React            from 'react'
import { connect }      from 'react-redux'

import linkDirection    from './linkDirection'
import Link             from './Link'

import {
  Navigation,
  Section,
}                       from './styled'


const HouseNavbar = connect (({ auth: { userId }}) => (
  { userId }))(
  ({ userId }) => {

    return (
      <Navigation>
        <Section>
          <Link direction={linkDirection('Rooms')}>
            Rooms
          </Link>
          <Link direction={linkDirection('schedule')}>
            Schedule
          </Link>

          {userId ? (
            <Link direction={linkDirection('People')}>
              People
            </Link>
          ) : null}
        </Section>
        <Section>
          <Link direction={linkDirection('announcements')}>
            Announcements
          </Link>
          <Link direction={linkDirection('sharedItems')}>
            Requests
          </Link>
          {userId ? (
            <Link direction={linkDirection('info')}>
              Info
            </Link>
          ) : null}
        </Section>
      </Navigation>
    )
  }
)

export default HouseNavbar
