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
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Register