import React from 'react'

import Header from './header.jsx'

/**
 * Component to list the AboutPhone in a conference
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const AboutPhone = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <div>
        <Header pageTitle="About the phone" />
        <p>AboutPhone</p>
      </div>
    )
  }

})

export default AboutPhone
