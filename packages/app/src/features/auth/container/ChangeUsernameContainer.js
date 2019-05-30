import { connect } from 'react-redux'
import { changeUsername } from '../_actions'
import ChangeUsername from '../ChangeUsername'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  changeUsername
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeUsername)
