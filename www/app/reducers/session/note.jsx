import {
  RECEIVE_NOTE,
  SAVE_NOTE
} from '../../actions/session/note.jsx'

function receiveNote(note) {
  return Object.assign({}, note)
}

function saveNote(state, id) {
  // TODO
}

const note = (state = {}, action) => {
  switch (action.type) {

  case RECEIVE_NOTE:
    return receiveNote(action.note)

  case SAVE_NOTE:
    return saveNote(state, action.id)

  default:
    return state
  }
}

export default note
