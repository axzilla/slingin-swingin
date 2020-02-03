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
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Settings
