import { isLoggedIn } from '../utils/initialize'
import UserRegister from '../views/auth/UserRegister'

function register() {
  return <UserRegister />
}

register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default register
