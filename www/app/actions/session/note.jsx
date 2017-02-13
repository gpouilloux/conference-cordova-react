import _ from 'lodash'
import conferenceData from '../../../data/devfest-2015.json'

export const RECEIVE_NOTE = 'RECEIVE_NOTE'
export const SAVE_NOTE = 'SAVE_NOTE'

function receiveNote(note) {
  note.session = _.find(conferenceData.sessions, session => session.id === note.sessionId)

  return {
    type: RECEIVE_NOTE,
    note
  }
}

export function saveNote(sessionId, comment, onSuccess, onFailure) {
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
          onSuccess()
          // dispatch(receiveNote(note))
        }, (tx, error) => {
          console.log('update KO')
          console.log(error)
          onFailure()
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
          onSuccess()
          // dispatch(receiveNote(note))
        }, (tx, error) => {
          console.log('insert KO')
          console.log(tx)
          console.log(error)
          onFailure()
          // FIXME dispatch saveNoteFailure(error)
          // snackbar notif
          // dispatch(receiveNote(null))
        })
      }
    }, (tx, error) => {
      console.log('unable to fetch note')
      onFailure()
      // FIXME dispatch receiveNoteFailure(error)
      // dispatch(receiveNote(null))
    })
  })
}

export function addPhotoToNote(sessionId, image) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql("UPDATE Notes SET image = ? WHERE sessionId = ?", [image, sessionId], function(tx, rs) {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              image
            })))
          }, (tx, error) => {
            console.log('update KO - image')
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        } else {
          tx.executeSql("INSERT INTO Notes (image, sessionId) VALUES (?, ?)", [image, sessionId], function(tx, rs) {
            console.log('insert OK - image')
            dispatch(receiveNote({
              sessionId,
              image
            }))
          }, (tx, error) => {
            console.log('insert KO - imamge')
            console.log(tx)
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        }
      }, (tx, error) => {
        console.log('unable to fetch note - image')
        // FIXME dispatch receiveNoteFailure(error)
        // dispatch(receiveNote(null))
      })
    })
  }
}

export function addAudioToNote(sessionId, audio) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql("UPDATE Notes SET audio = ? WHERE sessionId = ?", [audio, sessionId], function(tx, rs) {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              audio
            })))
          }, (tx, error) => {
            console.log('update KO')
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        } else {
          tx.executeSql("INSERT INTO Notes (audio, sessionId) VALUES (?, ?)", [audio, sessionId], function(tx, rs) {
            console.log('insert OK - audio')
            dispatch(receiveNote({
              sessionId,
              audio
            }))
          }, (tx, error) => {
            console.log('insert KO - audio')
            console.log(tx)
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        }
      }, (tx, error) => {
        console.log('unable to fetch note - audio')
        // FIXME dispatch receiveNoteFailure(error)
        // dispatch(receiveNote(null))
      })
    })
  }
}

export function addVideoToNote(sessionId, video) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
        const existingNote = rs.rows.item(0)
        // if note already exists
        if (existingNote) {
          tx.executeSql("UPDATE Notes SET video = ? WHERE sessionId = ?", [video, sessionId], function(tx, rs) {
            dispatch(receiveNote(Object.assign({}, existingNote, {
              video
            })))
          }, (tx, error) => {
            console.log('update KO')
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        } else {
          tx.executeSql("INSERT INTO Notes (video, sessionId) VALUES (?, ?)", [video, sessionId], function(tx, rs) {
            console.log('insert OK - video')
            dispatch(receiveNote({
              sessionId,
              video
            }))
          }, (tx, error) => {
            console.log('insert KO - video')
            console.log(tx)
            console.log(error)
            // FIXME dispatch saveNoteFailure(error)
            // snackbar notif
            // dispatch(receiveNote(null))
          })
        }
      }, (tx, error) => {
        console.log('unable to fetch note - video')
        // FIXME dispatch receiveNoteFailure(error)
        // dispatch(receiveNote(null))
      })
    })
  }
}

export function deleteImageFromNote(note) {
  return dispatch => {
    window.db.transaction(tx => {
      tx.executeSql("UPDATE Notes SET image = null WHERE id = ?", [note.id], function(tx, rs) {
        dispatch(receiveNote(Object.assign({}, note, {
          image: null
        })))
      }, (tx, error) => {
        console.log('delete KO')
        console.log(error)
        // FIXME dispatch saveNoteFailure(error)
        // snackbar notif
        // dispatch(receiveNote(null))
      })
    })
  }
}

export function fetchNoteFromSession(sessionId) {
  return dispatch => {
    window.db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM Notes WHERE sessionId = '${sessionId}'`, [], function(tx, rs) {
        const note = rs.rows.item(0) || {}
        dispatch(receiveNote(note))
      }, (tx, error) => {
        // FIXME dispatch receiveNoteFailure(error)
        // stay in display one session UI
        dispatch(receiveNote(null))
      })
    })
  }

}
