import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardProfile } from '../../views'

function profile() {
  return (
    <DashboardView>
      <DashboardProfile />
    </DashboardView>
  )
}

profile.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default profile
