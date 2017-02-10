import React from 'react'

import { Card, CardHeader, CardMedia, CardText, CardTitle } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'

import LinkWithoutUnderline from '../custom/linkWithoutUnderline.jsx'
import Header from '../header.jsx'

/**
 * Component to view a speaker
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Speaker = React.createClass({

  propTypes: {
    speaker: React.PropTypes.object.isRequired,
    speakerId: React.PropTypes.string.isRequired,
    fetchSpeaker: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the session
    this.props.fetchSpeaker(this.props.speakerId)
  },

  render() {

    const rightArrow = <i className="fa fa-angle-right" aria-hidden="true" />

    const sessions = this.props.speaker.sessions ? this.props.speaker.sessions.map(session => {
      return (
        <LinkWithoutUnderline key={session.id} to={`/sessions/${session.id}`}>
          <ListItem
            value={session.id}
            primaryText={session.title}
            rightIcon={rightArrow}
          />
        </LinkWithoutUnderline>
      )
    }) : undefined

    return (
      <div>
        <Header pageTitle='Speaker' hasReturnButton={true} />
        <Card>
          <CardHeader
            title={`${this.props.speaker.firstname} ${this.props.speaker.lastname}`}
            subtitle='Subtitle TBD'
          />
          <CardMedia>
            <img src={`img/speakers/${this.props.speaker.image}`} alt={`Image ${this.props.speaker.id}`}/>
          </CardMedia>
          <CardText>
          </CardText>
        </Card>
        <Card>
          <CardTitle>His sessions</CardTitle>
          <CardText>
            <List>
              {sessions}
            </List>
          </CardText>
        </Card>
      </div>
    )
  }

})

export default Speaker
