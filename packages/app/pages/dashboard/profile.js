import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../views/dashboard/Dashboard'
import ProfileEdit from '../../views/profile/ProfileEdit'

function profile() {
  return (
    <Dashboard>
      <ProfileEdit />
    </Dashboard>
  )
}

profile.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default profile
