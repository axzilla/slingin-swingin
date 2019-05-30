import { connect } from 'react-redux'
import { loginUser } from '../_actions'
import Login from '../Login'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  loginUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
