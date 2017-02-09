import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import sessions from './session/sessions.jsx'
import session from './session/session.jsx'
import speakers from './speaker/speakers.jsx'
import speaker from './speaker/speaker.jsx'

const rootReducer = combineReducers({
  routing: routerReducer,
  sessions,
  session,
  speakers,
  speaker
})

export default rootReducer
