import PropTypes from 'prop-types'

import { getPostsByUserId } from '@services/post'
import { getUserByUsername } from '@services/user'
import { getCommentsByUserId } from '@services/comment'
import { Main as MainLayout } from '@layouts'
import { ProfileDetails as ProfileDetailsView } from '@views'
import SeoMeta from '@components/SeoMeta'

function ProfileDetails({ user, posts, comments, username }) {
  return (
    <>
      <SeoMeta
        title={`${user.username} - digitalnomads.dev`}
        desc={`This is the profile page of ${user.username}`}
        canonical={`https://www.digitalnomads.dev/${user.username}`}
        ogImage={(user.avatar && user.avatar.secure_url) || null}
      />
      <MainLayout>
        <ProfileDetailsView user={user} posts={posts} comments={comments} username={username} />
      </MainLayout>
    </>
  )
}

ProfileDetails.getInitialProps = async ctx => {
  try {
    const { username } = ctx.query

    const user = await getUserByUsername(username)
    const posts = await getPostsByUserId(user.data._id)
    const comments = await getCommentsByUserId(user.data._id)

    return { user: user.data, posts: posts.data, comments: comments.data, username }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

ProfileDetails.propTypes = {
  user: PropTypes.object,
  posts: PropTypes.array,
  comments: PropTypes.array,
  username: PropTypes.string
}

export default ProfileDetails
