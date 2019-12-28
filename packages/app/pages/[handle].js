import PropTypes from 'prop-types'
import ProfileDetails from '../components/profile/ProfileDetails'

function profileDetails({ handle }) {
  return <ProfileDetails handle={handle} />
}

profileDetails.getInitialProps = ({ query }) => {
  const { handle } = query
  return { handle }
}

profileDetails.propTypes = {
  handle: PropTypes.object
}

export default profileDetails
