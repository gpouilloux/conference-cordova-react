export const FETCH_NOTE_FROM_SESSION = 'FETCH_NOTE_FROM_SESSION'
export const SAVE_NOTE = 'SAVE_NOTE'

export function fetchNoteFromSession(sessionId) {
  return {
    type: FETCH_NOTE_FROM_SESSION,
    sessionId
  }
}

export function saveNote(id) {
  return {
    type: SAVE_NOTE,
    id
  }
}
