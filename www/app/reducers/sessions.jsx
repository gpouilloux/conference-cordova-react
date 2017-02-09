import conferenceData from '../../data/devfest-2015.json'

import {
  FETCH_SESSIONS
} from '../actions/sessions.jsx'

function fetchSessions() {
  return conferenceData.sessions
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
