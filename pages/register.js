import { isLoggedIn } from '../utils/initialize'
import Register from '../components/auth/Register'

function register() {
  return <Register />
}

register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default register
