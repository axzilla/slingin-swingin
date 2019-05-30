import { connect } from 'react-redux'
import { forgotPassword } from '../_actions'
import ForgotPassword from '../ForgotPassword'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  forgotPassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword)
