import PropTypes from 'prop-types'

import { Main as MainLayout } from '@layouts'
import { PostDetails as PostDetailsView } from '@views'
import { getPostByShortId } from '@services/post'
// import { SeoMeta } from '@components'

function PostDetails({ post, urlSlug }) {
  return (
    <>
      {/* <SeoMeta
        title={`${urlSlug} - noize.dev`}
        // If data comes in getInitialProps please fill out desc with post body!?
        // desc={}
        canonical={`https://www.noize.dev/post/${post._id}/${urlSlug}`}
      /> */}
      <MainLayout>
        <PostDetailsView post={post} urlSlug={urlSlug} />
      </MainLayout>
    </>
  )
}

PostDetails.getInitialProps = async ctx => {
  try {
    const { postId, urlSlug } = ctx.query
    const post = await getPostByShortId(postId)

    return { urlSlug, post: post.data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  urlSlug: PropTypes.string
}

export default PostDetails
