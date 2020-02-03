import PropTypes from 'prop-types'

import { PasswordReset as PasswordResetView } from '@views'
import { Auth as AuthLayout } from '@layouts'

function resetPassword({ token }) {
  return (
    <AuthLayout>
      <PasswordResetView token={token} />
    </AuthLayout>
  )
}

resetPassword.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

resetPassword.propTypes = {
  token: PropTypes.object
}

export default resetPassword
