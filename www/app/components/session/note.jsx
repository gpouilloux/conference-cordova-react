import React from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import Header from '../header.jsx'

/**
 * Component to view notes taken for a session
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Note = React.createClass({

  propTypes: {
    note: React.PropTypes.object,
    sessionId: React.PropTypes.string.isRequired,
    fetchNoteFromSession: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the note
    this.props.fetchNoteFromSession(this.props.sessionId)
  },

  render() {

    return (
      <div>
        <Header pageTitle='My notes' hasReturnButton={true} />
        <Card>
          <CardTitle title={this.props.note.session ? this.props.note.session.title : ''}/>
          <CardText>
            <div style={{textAlign: 'center'}}>
              <RaisedButton label="Save" />
            </div>
            <div>
              <TextField
                id='notes-text-field'
                hintText={this.props.note.comment ? this.props.note.comment : 'Take notes here'}
                multiLine={true}
                rows={10}
              />
            </div>
          </CardText>
        </Card>
      </div>
    )
  }

})

export default Note
