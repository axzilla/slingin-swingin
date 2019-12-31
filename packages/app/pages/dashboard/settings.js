import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardSettings } from '../../views'

function settings() {
  return (
    <DashboardView>
      <DashboardSettings />
    </DashboardView>
  )
}

settings.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default settings
