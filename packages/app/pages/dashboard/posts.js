import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardPosts as DashboardPostsView } from '../../views'

function posts() {
  return (
    <DashboardView>
      <DashboardPostsView />
    </DashboardView>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
