import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_SPEAKERS,
  FETCH_SPEAKERS_WITH_IDS
} from '../../actions/speaker/speakers.jsx'

function fetchSpeakers() {
  return conferenceData.speakers
}

function fetchSpeakersWithIds(ids) {
  return _.filter(conferenceData.speakers, speaker => _.includes(ids, speaker.id))
}

const speakers = (state = [], action) => {
  switch (action.type) {

  case FETCH_SPEAKERS:
    return fetchSpeakers()

  case FETCH_SPEAKERS_WITH_IDS:
    return fetchSpeakersWithIds(action.ids)

  default:
    return state
  }
}

export default speakers
