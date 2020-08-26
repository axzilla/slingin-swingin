import PropTypes from 'prop-types'

import { Auth as AuthLayout } from '@layouts'
import { Login as LoginView } from '@views'

function ActivateAccount({ token }) {
  return (
    <AuthLayout>
      <LoginView token={token} />
    </AuthLayout>
  )
}

ActivateAccount.getInitialProps = async ctx => {
  try {
    const { token } = ctx.query
    return { token }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

ActivateAccount.propTypes = {
  token: PropTypes.string.isRequired
}

export default ActivateAccount
