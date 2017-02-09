import React from 'react'

import {Card, CardTitle, CardText} from 'material-ui/Card'
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import Header from './header.jsx'

/**
 * Component to view a session
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Session = React.createClass({

  propTypes: {
    session: React.PropTypes.object.isRequired,
    sessionId: React.PropTypes.string.isRequired,
    fetchSession: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the session
    this.props.fetchSession(this.props.sessionId)
  },

  render() {
    // wait that the session is fetched before rendering
    console.log(this.props.session)
    const speakers = this.props.session.speakersPlain.map(speaker => {
      <ListItem
        primaryText={`${speaker.firstname} ${speaker.lastname}`}
        leftAvatar={<Avatar src={`img/speakers/${speaker.image}`} />}
      />
    })

    // TODO: improvement: youtube thumbnail and click to open youtube
    return (
      <div>
        <Header pageTitle="Session" />
        <Card>
          <CardTitle title={this.props.session.title} subtitle="Card subtitle" />
          <CardText>
            {this.props.session.desc}
          </CardText>
          <List>
            {speakers}
          </List>
        </Card>
      </div>
    )
  }

})

export default Session
