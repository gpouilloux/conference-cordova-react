import { createStore, applyMiddleware, compose } from 'redux'
import handleTransitions from 'redux-history-transitions'

import rootReducer from '../reducers'

export default function configureStore(history) {

  // Enhancer to be able to change the URL after a Redux action
  const enhancer = handleTransitions(history)

  const store = createStore(
    rootReducer,
    enhancer
  )

  return store
}
