import { connect } from 'react-redux'

import Sessions from '../components/sessions.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = null

const SessionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sessions)

export default SessionsContainer
