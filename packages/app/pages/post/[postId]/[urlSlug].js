import PropTypes from 'prop-types'
import PostDetails from '../../../components/post/PostDetails'

function postDetails({ postId, urlSlug }) {
  return <PostDetails postId={postId} urlSlug={urlSlug} />
}

postDetails.getInitialProps = ({ query }) => {
  const { postId, urlSlug } = query
  return { postId, urlSlug }
}

postDetails.propTypes = {
  postId: PropTypes.string,
  urlSlug: PropTypes.string
}

export default postDetails
