import { connect } from 'react-redux'

import Home from '../components/home.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = null

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
