import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import sessions from './sessions.jsx'
import session from './session.jsx'
import speakers from './speakers.jsx'

const rootReducer = combineReducers({
  routing: routerReducer,
  sessions,
  session,
  speakers
})

export default rootReducer
