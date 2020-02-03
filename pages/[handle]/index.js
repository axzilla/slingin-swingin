import PropTypes from 'prop-types'

import { Main as MainLayout } from '@layouts'
import { ProfileDetails as ProfileDetailsView } from '@views'
import SeoMeta from '@components/SeoMeta'

function ProfileDetails({ handle }) {
  return (
    <>
      <SeoMeta
        title={`${handle} - bounce.dev`}
        // If data comes in getInitialProps please fill out desc with bio?!
        // desc={}
        canonical={`https://www.bounce.dev/${handle}`}
      />
      <MainLayout>
        <ProfileDetailsView handle={handle} />
      </MainLayout>
    </>
  )
}

ProfileDetails.getInitialProps = ({ query }) => {
  const { handle } = query
  return { handle }
}

ProfileDetails.propTypes = {
  handle: PropTypes.object
}

export default ProfileDetails
