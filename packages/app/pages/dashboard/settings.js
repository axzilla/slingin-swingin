import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../components/dashboard/Dashboard'
import DashboardSettings from '../../components/dashboard/DashboardSettings'

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
