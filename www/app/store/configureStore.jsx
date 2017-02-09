import { createStore, applyMiddleware, compose } from 'redux'
import handleTransitions from 'redux-history-transitions'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

export default function configureStore(history) {

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      }) : compose

  const enhancer = composeEnhancers(
      applyMiddleware(thunkMiddleware),
      handleTransitions(history)
    )

  const store = createStore(
    rootReducer,
    enhancer
  )

  return store
}
