import { connect } from 'react-redux'
import { changePassword } from '../_actions'
import ChangePassword from '../ChangePassword'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  changePassword
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword)
