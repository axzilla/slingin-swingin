import { isLoggedIn } from '../utils/initialize'
import ForgotPassword from '../components/auth/ForgotPassword'

function forgotPassword() {
  return <ForgotPassword />
}

forgotPassword.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default forgotPassword
