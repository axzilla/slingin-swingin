import { connect } from 'react-redux'
import { changeEmail } from '../_actions'
import ChangeEmail from '../ChangeEmail'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = { changeEmail }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeEmail)
