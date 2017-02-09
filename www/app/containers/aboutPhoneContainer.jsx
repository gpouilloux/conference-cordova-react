import { connect } from 'react-redux'

import AboutPhone from '../components/aboutPhone.jsx'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = null

const AboutPhoneContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPhone)

export default AboutPhoneContainer
