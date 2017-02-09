import React from 'react'

import Header from './header.jsx'

/**
 * Component to list the sessions in a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Sessions = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <div>
        <Header pageTitle="Sessions" />
        <p>Sessions</p>
      </div>
    )
  }

})

export default Sessions
