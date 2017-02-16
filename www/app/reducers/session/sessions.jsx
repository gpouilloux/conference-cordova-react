import moment from 'moment'

import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_SESSIONS
} from '../../actions/session/sessions.jsx'

function fetchSessions() {
  const hours = conferenceData.hours
  return conferenceData.sessions.map(session => {
    const sessionHour = hours[session.hour]
    const sessionStart = moment({hour: sessionHour.hourStart, minute: sessionHour.minStart})
    const sessionEnd = moment({hour: sessionHour.hourEnd, minute: sessionHour.minEnd})
    return Object.assign({}, session, {
      time: {
        start: sessionStart,
        end: sessionEnd
      }
    })
  })
}

const sessions = (state = [], action) => {
  switch (action.type) {

  case FETCH_SESSIONS:
    return fetchSessions()

  default:
    return state
  }
}

export default sessions
