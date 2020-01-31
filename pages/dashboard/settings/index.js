import { isNotLoggedIn } from '../../../utils/initialize'

import { Dashboard as DashboardLayout } from '../../../layouts'
import { DashboardSettings as DashboardSettingsView } from '../../../views'

function posts() {
  return (
    <DashboardLayout>
      <DashboardSettingsView />
    </DashboardLayout>
  )
}

posts.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default posts
