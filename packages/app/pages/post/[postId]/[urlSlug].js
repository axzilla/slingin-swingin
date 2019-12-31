import PropTypes from 'prop-types'
import { PostDetails } from '../../../views'
import SeoMeta from '../../../views/common/SeoMeta'

function postDetails({ postId, urlSlug }) {
  return (
    <>
      <SeoMeta
        title={`${urlSlug} - codehustla.dev`}
        // If data comes in getInitialProps please fill out desc with post body!?
        // desc={}
        canonical={`https://www.codehustla.dev/post/${postId}/${urlSlug}`}
      />
      <PostDetails postId={postId} urlSlug={urlSlug} />
    </>
  )
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
