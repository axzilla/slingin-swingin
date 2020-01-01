import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardProfile as DashboardProfileView } from '../../views'

function profile() {
  return (
    <DashboardView>
      <DashboardProfileView />
    </DashboardView>
  )
}

profile.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default profile
