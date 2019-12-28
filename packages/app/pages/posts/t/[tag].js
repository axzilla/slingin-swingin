import PropTypes from 'prop-types'
import PostsByTag from '../../../components/post/PostsByTag'

function postsByTag({ tag }) {
  return <PostsByTag tag={tag} />
}

postsByTag.getInitialProps = ({ query }) => {
  const { tag } = query
  return { tag }
}

postsByTag.propTypes = {
  tag: PropTypes.object
}

export default postsByTag
