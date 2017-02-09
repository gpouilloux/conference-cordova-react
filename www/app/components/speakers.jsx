import React from 'react'

import Header from './header.jsx'

/**
 * Component to list the speakers in a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Speakers = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <div>
        <Header pageTitle="Speakers" />
        <p>Speakers</p>
      </div>
    )
  }

})

export default Speakers
