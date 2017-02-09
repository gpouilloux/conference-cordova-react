import React from 'react'
import renderHTML from 'react-render-html'

import { Card, CardTitle, CardText } from 'material-ui/Card'

import Header from '../header.jsx'
import SpeakersListWithPictureContainer from '../../containers/speaker/speakersListWithPictureContainer.jsx'

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

    // TODO: improvement: youtube thumbnail and click to open youtube
    return (
      <div>
        <Header pageTitle="Session" />
        <Card>
          <CardTitle title={this.props.session.title}/>
          <CardText>
            {renderHTML(`<div>${this.props.session.desc}</div>`)}
          </CardText>
        </Card>
        <Card>
          {this.props.session.speakers ?
            <SpeakersListWithPictureContainer speakerIds={this.props.session.speakers} />
             : undefined
          }
        </Card>
      </div>
    )
  }

})

export default Session
