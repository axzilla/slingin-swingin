import { isLoggedIn } from '../utils/initialize'
import UserLogin from '../components/auth/UserLogin'

function login() {
  return <UserLogin />
}

login.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default login
