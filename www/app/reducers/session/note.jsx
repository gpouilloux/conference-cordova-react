import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

import {
  FETCH_NOTE_FROM_SESSION,
  SAVE_NOTE
} from '../../actions/session/note.jsx'

function fetchNoteFromSession(state, sessionId) {
  console.log('fetch note')
  const def = window.db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
      console.log('Transaction OK')
      // const note = rs.rows.item(0)
      // note.session = _.find(conferenceData.sessions, session => session.id === sessionId)
      // return note
      return rs.rows.item(0)
    }, (tx, error) => {
      console.log(`Transaction ERROR: ${error.message}`)
      return null
    })
  })
}

function saveNote(state, id) {
  // TODO
}

const note = (state = {}, action) => {
  switch (action.type) {

  case FETCH_NOTE_FROM_SESSION:
    return fetchNoteFromSession(state, action.sessionId)

  case SAVE_NOTE:
    return saveNote(state, action.id)

  default:
    return state
  }
}

export default note
