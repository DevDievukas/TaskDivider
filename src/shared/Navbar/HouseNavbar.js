import React            from 'react'
import { connect }      from 'react-redux'
import styled           from 'styled-components'

import linkDirection    from './linkDirection'
import Link             from './Link'


const Section = styled.div`
  justify-content: space-around;
  display: flex;
  text-align: center;
  border-bottom: 1px solid black;
`

const Navigation = styled.nav`
  display: block;
  margin-bottom: 8px;
`

const HouseNavbar = connect (({ auth: { userId }}) => (
  { userId }))(
  ({ userId }) => {

    return (
      <Navigation>
        <Section>
          <Link direction={linkDirection('Rooms')}>
            <h4>Rooms</h4>
          </Link>
          <Link direction={linkDirection('schedule')}>
            <h4>Schedule</h4>
          </Link>

          {userId ? (
            <Link direction={linkDirection('People')}>
              <h4>People</h4>
            </Link>
          ) : null}
        </Section>
        <Section>
          <Link direction={linkDirection('announcements')}>
            <h4>Announcements</h4>
          </Link>
          <Link direction={linkDirection('sharedItems')}>
            <h4>Requests</h4>
          </Link>
          {userId ? (
            <Link direction={linkDirection('info')}>
              <h4>Info</h4>
            </Link>
          ) : null}
        </Section>
      </Navigation>
    )
  }
)

export default HouseNavbar
