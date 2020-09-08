import PropTypes from 'prop-types'

import { Main as MainLayout } from '@layouts'
import { PostFeedByTag as PostFeedByTagView } from '@views'
import { SeoMeta } from '@components'

function PostsByTag({ tag }) {
  return (
    <>
      <SeoMeta
        title={`${tag} - noize.dev`}
        desc={`noize.dev - This is the ${tag} channel`}
        canonical={`https://www.noize.dev/posts/t/${tag}`}
        ogImage={null}
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
  tag: PropTypes.string
}

export default PostsByTag
