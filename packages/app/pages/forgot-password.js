import { isLoggedIn } from '../utils/initialize'
import PasswordForgot from '../views/auth/PasswordForgot'

function passwordForgot() {
  return <PasswordForgot />
}

passwordForgot.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default passwordForgot
