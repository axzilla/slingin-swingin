import { isNotLoggedIn } from '@utils/initialize'

import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardEditProfile as DashboardEditProfileView } from '@views'

function ProfileEdit() {
  return (
    <DashboardLayout>
      <DashboardEditProfileView />
    </DashboardLayout>
  )
}

ProfileEdit.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default ProfileEdit
