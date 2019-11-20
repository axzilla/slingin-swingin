import PropTypes from 'prop-types'
import PostEdit from '../../components/post/PostEdit'

function editPost({ id }) {
  return <PostEdit id={id} />
}

editPost.getInitialProps = ({ query }) => {
  const { id } = query
  return { id }
}

editPost.propTypes = {
  id: PropTypes.object
}

export default editPost
