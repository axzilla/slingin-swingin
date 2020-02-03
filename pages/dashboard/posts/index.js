import { isNotLoggedIn } from '@utils/initialize'
import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardPosts as DashboardPostsView } from '@views'

function Posts() {
  return (
    <DashboardLayout>
      <DashboardPostsView />
    </DashboardLayout>
  )
}

Posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Posts
