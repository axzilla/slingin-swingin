import { isLoggedIn } from '../utils/initialize'
import { Login } from '../views'

function login() {
  return <Login />
}

login.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default login
