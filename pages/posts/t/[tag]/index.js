import PropTypes from 'prop-types'

import { Main as MainLayout } from '@layouts'
import { PostFeedByTag as PostFeedByTagView } from '@views'
import { SeoMeta } from '@components'

function PostsByTag({ tag }) {
  return (
    <>
      <SeoMeta
        title={`${tag} - bounce.dev - Gemeinsam werden wir bessere Entwickler`}
        desc={`bounce.dev - Hier dreht sich alles um ${tag}`}
        canonical={`https://www.bounce.dev/posts/t/${tag}`}
      />
      <MainLayout>
        <PostFeedByTagView tag={tag} />
      </MainLayout>
    </>
  )
}

PostsByTag.getInitialProps = ({ query }) => {
  const { tag } = query
  return { tag }
}

PostsByTag.propTypes = {
  tag: PropTypes.object
}

export default PostsByTag
