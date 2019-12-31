import PropTypes from 'prop-types'
import PasswordReset from '../../views/auth/PasswordReset'

function resetPassword({ token }) {
  return <PasswordReset token={token} />
}

resetPassword.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

resetPassword.propTypes = {
  token: PropTypes.object
}

export default resetPassword
