import { connect } from 'react-redux'

import Speakers from '../components/speakers.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = null

const SpeakersContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Speakers)

export default SpeakersContainer
