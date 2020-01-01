import { isLoggedIn } from '../utils/initialize'

import { Main as MainLayout } from '../layouts'
import { Login as LoginView } from '../views'

function login() {
  return (
    <MainLayout>
      <LoginView />
    </MainLayout>
  )
}

login.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default login
