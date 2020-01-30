import { isLoggedIn } from '../../utils/initialize'

import { Main as MainLayout } from '../../layouts'
import { PasswordForgot as PasswordForgotView } from '../../views'

function passwordForgot() {
  return (
    <MainLayout>
      <PasswordForgotView />
    </MainLayout>
  )
}

passwordForgot.getInitialProps = ctx => {
  isLoggedIn(ctx)
  return {}
}

export default passwordForgot
