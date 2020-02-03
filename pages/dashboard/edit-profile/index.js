import { isNotLoggedIn } from '@utils/initialize'

import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardEditProfile as DashboardEditProfileView } from '@views'

function EditProfile() {
  return (
    <DashboardLayout>
      <DashboardEditProfileView />
    </DashboardLayout>
  )
}

EditProfile.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default EditProfile
