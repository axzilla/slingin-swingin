import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../components/dashboard/Dashboard'
import TabsPost from '../../components/dashboard/TabsPost'

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
