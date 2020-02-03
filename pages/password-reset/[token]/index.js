import PropTypes from 'prop-types'

import { PasswordReset as PasswordResetView } from '@views'
import { Auth as AuthLayout } from '@layouts'

function PasswordReset({ token }) {
  return (
    <AuthLayout>
      <PasswordResetView token={token} />
    </AuthLayout>
  )
}

PasswordReset.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

PasswordReset.propTypes = {
  token: PropTypes.object
}

export default PasswordReset
