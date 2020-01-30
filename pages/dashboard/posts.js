import { isNotLoggedIn } from '../../utils/initialize'
import { Main as MainView } from '../../layouts'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardPosts as DashboardPostsView } from '../../views'

function posts() {
  return (
    <MainView>
      <DashboardView>
        <DashboardPostsView />
      </DashboardView>
    </MainView>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
