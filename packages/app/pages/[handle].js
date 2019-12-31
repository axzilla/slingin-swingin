import PropTypes from 'prop-types'

import ProfileDetails from '../components/profile/ProfileDetails'
import SeoMeta from '../components/common/SeoMeta'

function profileDetails({ handle }) {
  return (
    <>
      <SeoMeta
        title={`${handle} - codehustla.dev`}
        // If data comes in getInitialProps please fill out desc with bio?!
        // desc={}
        canonical={`https://www.codehustla.dev/${handle}`}
      />
      <ProfileDetails handle={handle} />
    </>
  )
}

profileDetails.getInitialProps = ({ query }) => {
  const { handle } = query
  return { handle }
}

profileDetails.propTypes = {
  handle: PropTypes.object
}

export default profileDetails
