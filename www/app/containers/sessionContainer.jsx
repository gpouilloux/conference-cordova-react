import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Session from '../components/session.jsx'
import * as SessionActions from '../actions/session.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    session: state.session,
    sessionId: ownProps.params.id
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SessionActions, dispatch)

const SessionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Session)

export default SessionContainer
