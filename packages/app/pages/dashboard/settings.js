import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../views/dashboard/Dashboard'
import DashboardSettings from '../../views/dashboard/DashboardSettings'

function settings() {
  return (
    <Dashboard>
      <DashboardSettings />
    </Dashboard>
  )
}

settings.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default settings
