import { isLoggedIn } from '@utils/initialize'
import { Auth as AuthLayout } from '@layouts'
import { Register as RegisterView } from '@views'

function Register() {
  return (
    <AuthLayout>
      <RegisterView />
    </AuthLayout>
  )
}

Register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default Register
