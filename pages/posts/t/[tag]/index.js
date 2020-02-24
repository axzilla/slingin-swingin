import PropTypes from 'prop-types'

import { Main as MainLayout } from '@layouts'
import { PostFeedByTag as PostFeedByTagView } from '@views'
import { SeoMeta } from '@components'

function PostsByTag({ tag }) {
  return (
    <>
      <SeoMeta
        title={`${tag} - noize.dev - The #1 Music Production Community`}
        desc={`noize.dev - Hier dreht sich alles um ${tag}`}
        canonical={`https://www.noize.dev/posts/t/${tag}`}
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
