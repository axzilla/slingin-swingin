import { isLoggedIn } from '../utils/initialize'
import UserRegister from '../components/auth/UserRegister'

function register() {
  return <UserRegister />
}

register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default register
