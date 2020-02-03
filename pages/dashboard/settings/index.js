import { isNotLoggedIn } from '@utils/initialize'

import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardSettings as DashboardSettingsView } from '@views'

function Settings() {
  return (
    <DashboardLayout>
      <DashboardSettingsView />
    </DashboardLayout>
  )
}

Settings.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default Settings
