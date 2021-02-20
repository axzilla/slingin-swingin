// Packages
import PropTypes from 'prop-types'

// // Utils
// import rawToHtml from '@utils/rawToHtml'
// import htmlRemove from '@utils/htmlRemove'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { PostDetails as PostDetailsView } from '@views'

// Services
import { getPostById } from '@services/post'
import { getCommentsByPostRef } from '@services/comment'
// import { SeoMeta } from '@components'

function PostDetails({ post, commentsData }) {
  return (
    <>
      {/* <SeoMeta
        title={`${post.title} - digitalnomads.dev`}
        desc={post.content}
        canonical={`https://www.digitalnomads.dev/post/${post.shortId}/${urlSlug}`}
        ogImage={(post.titleImage && post.titleImage.secure_url) || null}
        ogTitle={post.title}
        ogDescription={htmlRemove(rawToHtml(post.contentRaw))}
      /> */}
      <MainLayout>
        <PostDetailsView post={post} commentsData={commentsData} />
      </MainLayout>
    </>
  )
}

PostDetails.getInitialProps = async ctx => {
  try {
    const { postId } = ctx.query
    const { data: post } = await getPostById(postId)
    const { data: comments } = await getCommentsByPostRef(post._id)

    return { post, commentsData: comments }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  commentsData: PropTypes.array
}

export default PostDetails
