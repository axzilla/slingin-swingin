import PropTypes from 'prop-types'
import { Main as MainLayout } from '../layouts'

import { ProfileDetails as ProfileDetailsView } from '../views'
import { SeoMeta } from '../components'

function profileDetails({ handle }) {
  return (
    <>
      <SeoMeta
        title={`${handle} - codehustla.dev`}
        // If data comes in getInitialProps please fill out desc with bio?!
        // desc={}
        canonical={`https://www.codehustla.dev/${handle}`}
      />
      <MainLayout>
        <ProfileDetailsView handle={handle} />
      </MainLayout>
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
