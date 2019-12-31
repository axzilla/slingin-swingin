import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardPosts } from '../../views'

function posts() {
  return (
    <DashboardView>
      <DashboardPosts />
    </DashboardView>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
