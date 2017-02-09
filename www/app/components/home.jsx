import React from 'react'

import Header from './header.jsx'

/**
 * Home component
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Home = React.createClass({

  propTypes: {
  },

  render() {
    return (
      <div>
        <Header pageTitle="Conférence" />
        <p>Conférence</p>
      </div>
    )
  }

})

export default Home
