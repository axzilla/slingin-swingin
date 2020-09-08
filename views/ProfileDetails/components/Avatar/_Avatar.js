// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import { UserAvatar } from '@components'

function ProfileDetailsAvatar({ profile }) {
  return <UserAvatar user={profile.user} height={125} width={125} />
}

ProfileDetailsAvatar.propTypes = {
  profile: PropTypes.object
}

export default ProfileDetailsAvatar
