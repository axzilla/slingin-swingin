import { connect } from 'react-redux'
import { registerUser } from '../_actions'
import Register from '../Register'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  registerUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)
