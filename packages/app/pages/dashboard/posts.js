import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../views/dashboard/Dashboard'
import TabsPost from '../../views/dashboard/TabsPost'

function posts() {
  return (
    <Dashboard>
      <TabsPost />
    </Dashboard>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
