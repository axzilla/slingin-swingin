import { connect } from 'react-redux'
import Dashboard from '../Dashboard'
import { logoutUser } from '../../auth/_actions'
import {
  getCurrentProfile,
  getProfilesByFollowingId,
  getProfilesByFollowerId,
  clearCurrentProfile
} from '../../profile/_actions'
import { getCommentsByUserId } from '../../comment/_actions'
import {
  getPostsByUserBookmark,
  getPostsByUserId,
  getDraftPostsByUserId
} from '../../post/_actions'

const mapStateToProps = ({ post, profile, auth, comments }) => ({
  post,
  profile,
  auth,
  comments
})

const mapDispatchToProps = {
  getCurrentProfile,
  getProfilesByFollowingId,
  getProfilesByFollowerId,
  clearCurrentProfile,
  getPostsByUserBookmark,
  getPostsByUserId,
  getDraftPostsByUserId,
  logoutUser,
  getCommentsByUserId
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
