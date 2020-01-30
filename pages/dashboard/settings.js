import { isNotLoggedIn } from '../../utils/initialize'
import { Dashboard as DashboardView } from '../../layouts'
import { DashboardSettings as DashboardSettingsView } from '../../views'

function settings() {
  return (
    <DashboardView>
      <DashboardSettingsView />
    </DashboardView>
  )
}

settings.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default settings
