import { connect } from 'react-redux'
import { updateSettings } from '../_actions'
import Settings from '../Settings'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = {
  updateSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
