import { connect } from 'react-redux'
import { createComment } from '../_actions'
import CommentEdit from '../CommentEdit'

const mapStateToProps = ({ comments }) => ({ comments })

const mapDispatchToProps = {
  createComment
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentEdit)
