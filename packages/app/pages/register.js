import { isLoggedIn } from '../utils/initialize'

import { Main as MainLayout } from '../layouts'
import { Register as RegisterView } from '../views'

function register() {
  return (
    <MainLayout>
      <RegisterView />
    </MainLayout>
  )
}

register.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default register
