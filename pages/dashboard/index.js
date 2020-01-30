import { isNotLoggedIn } from '../../utils/initialize'

import { Main as MainLayout } from '../../layouts'
import { Dashboard as DashboardLayout } from '../../layouts'
import { Dashboard as DashboardView } from '../../views'

function posts() {
  return (
    <MainLayout>
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </MainLayout>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
