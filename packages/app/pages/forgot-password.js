import { isLoggedIn } from '../utils/initialize'
import { PasswordForgot } from '../views'

function passwordForgot() {
  return <PasswordForgot />
}

passwordForgot.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default passwordForgot
