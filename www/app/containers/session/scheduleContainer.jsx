import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Schedule from '../../components/session/schedule.jsx'
import * as SessionsActions from '../../actions/session/sessions.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
    sessions: state.sessions.sort((a, b) => a.time.start.toDate() - b.time.start.toDate())
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(SessionsActions, dispatch)

const ScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Schedule)

export default ScheduleContainer
