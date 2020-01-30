import { isLoggedIn } from '../../utils/initialize'

import { Auth as AuthLayout } from '../../layouts'
import { Register as RegisterView } from '../../views'

function register() {
  return (
    <AuthLayout>
      <RegisterView />
    </AuthLayout>
  )
}

register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default register
