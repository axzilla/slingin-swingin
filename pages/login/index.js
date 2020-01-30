import { isLoggedIn } from '../../utils/initialize'

import { Auth as AuthLayout } from '../../layouts'
import { Login as LoginView } from '../../views'

function login() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  )
}

login.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default login
