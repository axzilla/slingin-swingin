import { isLoggedIn } from '../../utils/initialize'

import { Auth as AuthLayout } from '../../layouts'
import { PasswordForgot as PasswordForgotView } from '../../views'

function passwordForgot() {
  return (
    <AuthLayout>
      <PasswordForgotView />
    </AuthLayout>
  )
}

passwordForgot.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default passwordForgot
