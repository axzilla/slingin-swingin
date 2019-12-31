import PropTypes from 'prop-types'
import { PostFeedByTag } from '../../../views'
import SeoMeta from '../../../views/common/SeoMeta'

function postsByTag({ tag }) {
  return (
    <>
      <SeoMeta
        title={`${tag} - codehustla.dev - Gemeinsam werden wir bessere Entwickler`}
        desc={`codehustla.dev - Hier dreht sich alles um ${tag}`}
        canonical={`https://www.codehustla.dev/posts/t/${tag}`}
      />
      <PostFeedByTag tag={tag} />
    </>
  )
}

postsByTag.getInitialProps = ({ query }) => {
  const { tag } = query
  return { tag }
}

postsByTag.propTypes = {
  tag: PropTypes.object
}

export default postsByTag
