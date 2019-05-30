import { connect } from 'react-redux'
import { setNewPassword } from '../_actions'
import ResetPassword from '../ResetPassword'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = { setNewPassword }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword)
