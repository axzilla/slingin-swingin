// Packages
import PropTypes from 'prop-types'

// Utils
import rawToHtml from '@utils/rawToHtml'
import htmlRemove from '@utils/htmlRemove'

import { Main as MainLayout } from '@layouts'
import { PostDetails as PostDetailsView } from '@views'
import { getPostByShortId } from '@services/post'
import { getCommentsByPostRef } from '@services/comment'
import { SeoMeta } from '@components'

function PostDetails({ post, commentsData, urlSlug }) {
  return (
    <>
      <SeoMeta
        title={`${post.title} - digitalnomads.dev`}
        desc={post.content}
        canonical={`https://www.digitalnomads.dev/post/${post.shortId}/${urlSlug}`}
        ogImage={(post.titleImage && post.titleImage.secure_url) || null}
        ogTitle={post.title}
        ogDescription={htmlRemove(rawToHtml(post.contentRaw))}
      />
      <MainLayout>
        <PostDetailsView post={post} commentsData={commentsData} urlSlug={urlSlug} />
      </MainLayout>
    </>
  )
}

PostDetails.getInitialProps = async ctx => {
  try {
    const { postId, urlSlug } = ctx.query
    const post = await getPostByShortId(postId)
    const comments = await getCommentsByPostRef(post.data._id)

    return { urlSlug, post: post.data, commentsData: comments.data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  commentsData: PropTypes.array,
  urlSlug: PropTypes.string
}

export default PostDetails
