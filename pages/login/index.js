import { isLoggedIn } from '@utils/initialize'
import { Auth as AuthLayout } from '@layouts'
import { Login as LoginView } from '@views'

function Login() {
  return (
    <AuthLayout>
      <LoginView />
    </AuthLayout>
  )
}

Login.getInitialProps = ctx => {
  isLoggedIn(ctx)
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Login
