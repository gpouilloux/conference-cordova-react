import React from 'react'
import renderHTML from 'react-render-html'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

import Header from '../header.jsx'

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

    const speakersWithPicture = this.props.session.speakersPlain ? this.props.session.speakersPlain.map(speaker => {
      return (
        <ListItem key={speaker.id}
          primaryText={`${speaker.firstname} ${speaker.lastname}`}
          leftAvatar={<Avatar src={`img/speakers/${speaker.image}`} />}
        />
      )
    }) : undefined

    // TODO: improvement: youtube thumbnail and click to open youtube
    return (
      <div>
        <Header pageTitle='Session' hasReturnButton={true} />
        <Card>
          <CardTitle title={this.props.session.title}/>
          <CardText>
            {renderHTML(`<div>${this.props.session.desc}</div>`)}
          </CardText>
        </Card>
        <Card>
          <List>
            {speakersWithPicture}
          </List>
        </Card>
      </div>
    )
  }

})

export default Session
