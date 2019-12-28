import { isNotLoggedIn } from '../../utils/initialize'
import Dashboard from '../../components/dashboard/Dashboard'
import ProfileEdit from '../../components/profile/ProfileEdit'

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
