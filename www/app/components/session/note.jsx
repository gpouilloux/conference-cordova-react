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

  getInitialState() {
    return {
      noteComment: this.props.note.comment
    }
  },

  propTypes: {
    note: React.PropTypes.object,
    sessionId: React.PropTypes.string.isRequired,
    fetchNoteFromSession: React.PropTypes.func.isRequired,
    saveNote: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    // load the note
    this.props.fetchNoteFromSession(this.props.sessionId)
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      noteComment: newProps.note.comment
    })
  },

  render() {
    return (
      <div>
        <Header pageTitle='My notes' hasReturnButton={true} />
        <Card>
          <CardTitle title={this.props.note.session ? this.props.note.session.title : ''}/>
          <CardText>
            <div style={{textAlign: 'center'}}>
              <RaisedButton label='Save' onTouchTap={this._saveNote} />
            </div>
            <div>
              <TextField
                id='notes-text-field'
                hintText='Take notes here'
                multiLine={true}
                rows={10}
                value={this.state.noteComment}
                onChange={this._noteCommentChanged}
              />
            </div>
          </CardText>
        </Card>
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _saveNote() {
    this.props.saveNote(this.props.sessionId, this.state.noteComment)
  },

  _noteCommentChanged(component, value) {
    this.setState({
      noteComment: value
    })
  }

})

export default Note
