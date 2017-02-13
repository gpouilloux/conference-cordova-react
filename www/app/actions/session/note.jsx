import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

export const RECEIVE_NOTE = 'RECEIVE_NOTE'
export const SAVE_NOTE = 'SAVE_NOTE'

function receiveNote(note) {
  return {
    type: RECEIVE_NOTE,
    note
  }
}

export function saveNote(id) {
  return {
    type: SAVE_NOTE,
    id
  }
}

export function fetchNoteFromSession(sessionId) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
        const note = rs.rows.item(0) || {}
        note.session = _.find(conferenceData.sessions, session => session.id === sessionId)
        dispatch(receiveNote(note))
      }, (tx, error) => {
        // FIXME dispatch receiveNoteFailure(error)
        // stay in display one session UI
        dispatch(receiveNote(null))
      })
    })
  }

}
