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

export function saveNote(sessionId, comment) {
  window.db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
      const existingNote = rs.rows.item(0)
      // if note already exists
      if (existingNote) {
        tx.executeSql("UPDATE Notes SET comment = ? WHERE sessionId = ?", [comment, sessionId], function(tx, rs) {
          // dispatch(receiveNote(Object.assign))
          console.log('update OK')
          const note = {
            id: rs.insertId,
            comment,
            sessionId
          }
          // dispatch(receiveNote(note))
        }, (tx, error) => {
          console.log('update KO')
          console.log(error)
          // FIXME dispatch saveNoteFailure(error)
          // snackbar notif
          // dispatch(receiveNote(null))
        })
      } else {
        tx.executeSql("INSERT INTO Notes (comment, sessionId) VALUES (?, ?)", [comment, sessionId], function(tx, rs) {
          console.log('insert OK')
          const note = {
            id: rs.insertId,
            comment,
            sessionId
          }
          // dispatch(receiveNote(note))
        }, (tx, error) => {
          console.log('insert KO')
          console.log(tx)
          console.log(error)
          // FIXME dispatch saveNoteFailure(error)
          // snackbar notif
          // dispatch(receiveNote(null))
        })
      }
    }, (tx, error) => {
      console.log('unable to fetch note')
      // FIXME dispatch receiveNoteFailure(error)
      // dispatch(receiveNote(null))
    })
  })
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
