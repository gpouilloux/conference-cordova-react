import React from 'react'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import { Image } from 'material-ui-image'

import Header from '../header.jsx'

/**
 * Component to view notes taken for a session
 * @author Guillaume Pouilloux <gui.pouilloux@gmail.com>
 */
const Note = React.createClass({

  getInitialState() {
    return {
      noteComment: this.props.note.comment,
      openPhotoSnackbar: false,
      openFailAudioSnackbar: false,
      openFailVideoSnackbar: false
    }
  },

  propTypes: {
    note: React.PropTypes.object,
    sessionId: React.PropTypes.string.isRequired,
    fetchNoteFromSession: React.PropTypes.func.isRequired,
    saveNote: React.PropTypes.func.isRequired,
    addPhotoToNote: React.PropTypes.func.isRequired,
    addAudioToNote: React.PropTypes.func.isRequired,
    addVideoToNote: React.PropTypes.func.isRequired
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
    const buttonIconStyle = {
      lineHeight: '1.3'
    }
    const snackbarAutoHideDuration = 4000

    return (
      <div>
        <Header pageTitle='My notes' hasReturnButton={true} />
        <Card>
          <CardTitle title={this.props.note.session ? this.props.note.session.title : ''}/>
          <CardText>
            <RaisedButton
              icon={<i className='fa fa-camera fa-2x' aria-hidden='true' style={buttonIconStyle}/>}
              onTouchTap={this._takePicture}
            />
            <RaisedButton
              icon={<i className='fa fa-picture-o fa-2x' aria-hidden='true' style={buttonIconStyle}/>}
              onTouchTap={this._usePicture}
            />
            <RaisedButton
              icon={
                <i className='fa fa-microphone fa-2x' aria-hidden='true'
                  style={Object.assign({}, buttonIconStyle, {color: this.props.note.audio ? 'black' : 'red'})}
                />}
              onTouchTap={this.props.note.audio ? this._playAudio : this._captureAudio}
            />
            <RaisedButton
              icon={
                <i className='fa fa-video-camera fa-2x' aria-hidden='true'
                  style={Object.assign({}, buttonIconStyle, {color: this.props.note.video ? 'black' : 'red'})}
                />}
              onTouchTap={this.props.note.video ? this._playVideo : this._captureVideo}
            />
            <div>
              <RaisedButton label='Save' onTouchTap={this._saveNote}
                style={{marginTop: '10px', marginBottom: '10px'}} fullWidth={true} />
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
            <div>
              {this.props.note.image ?
                <Image src={`data:image/jpeg;base64,${this.props.note.image}`} />
                : undefined
              }
            </div>
          </CardText>
        </Card>
        <Snackbar
          open={this.state.openSuccessSaveSnackbar}
          message='Note saved successfully'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openFailSaveSnackbar}
          message='Error while saving the note'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openPhotoSnackbar}
          message='Error while adding the photo'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openFailAudioSnackbar}
          message='Error while recording the audio'
          autoHideDuration={snackbarAutoHideDuration}
        />
        <Snackbar
          open={this.state.openFailVideoSnackbar}
          message='Error while recording the video'
          autoHideDuration={snackbarAutoHideDuration}
        />
      </div>
    )
  },

  //////////////////////
  // PRIVATE          //
  //////////////////////

  _onSuccessSave() {
    this.setState({
      openSuccessSaveSnackbar: true
    })
  },

  _onFailSave() {
    this.setState({
      openFailSaveSnackbar: true
    })
  },

  _saveNote() {
    this.props.saveNote(this.props.sessionId, this.state.noteComment,
      this._onSuccessSave, this._onFailSave)
  },

  _noteCommentChanged(component, value) {
    this.setState({
      noteComment: value
    })
  },

  _onSuccessPicture(imageData) {
    this.props.addPhotoToNote(this.props.sessionId, imageData)
  },

  _onFailPicture() {
    this.setState({
      openPhotoSnackbar: true
    })
  },

  _takePicture() {
    const cameraOptions = {
      quality: 50,
      sourceType: window.navigator.camera.PictureSourceType.CAMERA,
      destinationType: window.navigator.camera.DestinationType.DATA_URL,
      cameraDirection: window.navigator.camera.Direction.BACK,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: window.navigator.camera.EncodingType.JPEG
    }
    window.navigator.camera.getPicture(this._onSuccessPicture, this._onFailPicture, cameraOptions)
  },

  _usePicture() {
    const cameraOptions = {
      sourceType: window.navigator.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: window.navigator.camera.DestinationType.DATA_URL,
      mediaType: window.navigator.camera.MediaType.PICTURE,
      encodingType: window.navigator.camera.EncodingType.JPEG
    }
    window.navigator.camera.getPicture(this._onSuccessPicture, this._onFailPicture, cameraOptions)
  },

  _captureAudio() {
    const onSuccessCaptureAudio = mediaFiles => {
      mediaFiles.forEach(mediaFile => this.props.addAudioToNote(this.props.sessionId, mediaFile.fullPath))
    }
    const onFailCaptureAudio = () => this.setState({openFailAudioSnackbar: true})

    const optionsCaptureAudio = {limit: 1}
    window.navigator.device.capture.captureAudio(onSuccessCaptureAudio, onFailCaptureAudio, optionsCaptureAudio)
  },

  _captureVideo() {
    const onSuccessCaptureVideo = mediaFiles => {
      mediaFiles.forEach(mediaFile => this.props.addVideoToNote(this.props.sessionId, mediaFile.fullPath))
    }
    const onFailCaptureVideo = () => this.setState({openFailVideoSnackbar: true})

    const optionsCaptureVideo = {limit: 1}
    window.navigator.device.capture.captureVideo(onSuccessCaptureVideo, onFailCaptureVideo, optionsCaptureVideo)
  },

  _playAudio() {
    window.plugins.streamingMedia.playAudio(this.props.note.audio)
  },

  _playVideo() {
    console.log(this.props.note.video)
    window.plugins.streamingMedia.playVideo(this.props.note.video)
  }
})

export default Note
