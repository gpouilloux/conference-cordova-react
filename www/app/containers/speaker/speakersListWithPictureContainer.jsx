import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SpeakersListWithPicture from '../../components/speaker/speakersListWithPicture.jsx'
import * as SpeakersActions from '../../actions/speaker/speakers.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    speakers: state.speakers,
    speakerIds: ownProps.speakerIds
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SpeakersActions, dispatch)

const SpeakersListWithPictureContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SpeakersListWithPicture)

export default SpeakersListWithPictureContainer
