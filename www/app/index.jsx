import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import {
  Router,
  Route,
  IndexRoute,
  hashHistory
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore.jsx'
import HomeContainer from './containers/homeContainer.jsx'
import SessionsContainer from './containers/sessionsContainer.jsx'
import SpeakersContainer from './containers/speakersContainer.jsx'

const App = React.createClass({

  render() {
    // Create an enhanced history that syncs navigation events with the store
    const store = configureStore(hashHistory)
    const history = syncHistoryWithStore(hashHistory, store)

    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={HomeContainer}>
              <IndexRoute component={HomeContainer} />
              <Route path="sessions" component={SessionsContainer} />
              <Route path="speakers" component={SpeakersContainer} />
            </Route>
          </Router>
        </Provider>
      </MuiThemeProvider>
    )
  }
})

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(<App/>, document.getElementById('app'))
