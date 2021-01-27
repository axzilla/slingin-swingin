// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Global Components
import { UserAvatar } from '@components'

function ProfileDetailsAvatar({ user }) {
  return <UserAvatar user={user} height={125} width={125} />
}

ProfileDetailsAvatar.propTypes = {
  user: PropTypes.object
}

export default ProfileDetailsAvatar
