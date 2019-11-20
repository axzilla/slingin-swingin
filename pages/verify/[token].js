import PropTypes from 'prop-types'
import Verify from '../../components/auth/Verify'

function verify({ token }) {
  return <Verify token={token} />
}

verify.getInitialProps = ({ query }) => {
  const { token } = query
  return { token }
}

verify.propTypes = {
  token: PropTypes.string
}

export default verify
