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
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default PasswordForgot
