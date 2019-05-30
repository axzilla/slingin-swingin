import { connect } from 'react-redux'
import { verifyUser } from '../_actions'
import Verify from '../Verify'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = { verifyUser }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Verify)
