import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_SESSION
} from '../../actions/session/session.jsx'

function fetchSession(state,id) {
  const session = _.find(conferenceData.sessions, session => session.id === id)
  session.speakersPlain = session.speakers.map(speakerId => {
    return _.find(conferenceData.speakers, speaker => speaker.id === speakerId)
  })
  return Object.assign({}, state, session)
}

const session = (state = {}, action) => {
  switch (action.type) {

  case FETCH_SESSION:
    return fetchSession(state, action.id)

  default:
    return state
  }
}

export default session
