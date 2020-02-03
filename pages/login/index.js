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
  return {}
}

export default Login
