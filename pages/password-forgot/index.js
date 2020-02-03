import { isLoggedIn } from '@utils/initialize'
import { Auth as AuthLayout } from '@layouts'
import { PasswordForgot as PasswordForgotView } from '@views'

function PasswordForgot() {
  return (
    <AuthLayout>
      <PasswordForgotView />
    </AuthLayout>
  )
}

PasswordForgot.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default PasswordForgot
