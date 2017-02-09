import React from 'react'
import { Link } from 'react-router'

import { Card, CardActions, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

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
        <div>
          <Card>
            <CardHeader
              title="Conférence"
              subtitle="09/02/2017 - 10/02/2017"
            />
            <CardMedia>
              <img src="img/imt_atlantique.jpg" alt="Logo IMT Atlantique"/>
            </CardMedia>
            <CardActions>
              <Link to="/sessions">
                <RaisedButton label="View the sessions"/>
              </Link>
              <Link to="/speakers">
                <RaisedButton label="View the speakers"/>
              </Link>
            </CardActions>
          </Card>
        </div>
      </div>
    )
  }

})

export default Home
