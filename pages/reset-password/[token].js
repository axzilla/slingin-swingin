import PropTypes from 'prop-types'
import ResetPassword from '../../components/auth/ResetPassword'

function resetPassword({ token }) {
  return <ResetPassword token={token} />
}

resetPassword.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

resetPassword.propTypes = {
  token: PropTypes.object
}

export default resetPassword
