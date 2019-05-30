import { connect } from 'react-redux'
import { sendVerificationEmail, logoutUser } from '../_actions'
import { getCurrentProfile, clearCurrentProfile } from '../../profile/_actions'
import NotVerified from '../NotVerified'

const mapStateToProps = ({ profile, auth }) => ({ profile, auth })

const mapDispatchToProps = {
  getCurrentProfile,
  clearCurrentProfile,
  sendVerificationEmail,
  logoutUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotVerified)
