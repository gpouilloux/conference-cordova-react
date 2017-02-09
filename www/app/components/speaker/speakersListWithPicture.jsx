import React from 'react'

import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'

/**
 * Component to view a list of speakers with their pictures
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const SpeakersListWithPicture = React.createClass({

  propTypes: {
    speakers: React.PropTypes.array.isRequired,
    speakerIds: React.PropTypes.array.isRequired,
    fetchSpeakersWithIds: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the speakers
    this.props.fetchSpeakersWithIds(this.props.speakerIds)
  },

  render() {
    const speakersWithPicture = this.props.speakers.map(speaker => {
      return (
        <ListItem key={speaker.id}
          primaryText={`${speaker.firstname} ${speaker.lastname}`}
          leftAvatar={<Avatar src={`img/speakers/${speaker.image}`} />}
        />
      )
    })

    return (
      <List>
        {speakersWithPicture}
      </List>
    )
  }

})

export default SpeakersListWithPicture
