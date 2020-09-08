// PAckages
import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

// Global Components
import Link from '@components/Link'
import UserAvatar from '@components/UserAvatar'

// MUI
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

function ProfilesFeedItem({ profile }) {
  return (
    <Card>
      <CardHeader
        title={
          <Link underlined href="/[handle]" as={`/${profile.handle}`}>
            {profile.handle}
          </Link>
        }
        subheader={
          <small>
            <Moment fromNow>{profile.dateCreated}</Moment>
          </small>
        }
        avatar={
          <Link href="/[handle]" as={`/${profile.handle}`}>
            <UserAvatar user={profile.user} />
          </Link>
        }
      />
    </Card>
  )
}

ProfilesFeedItem.propTypes = {
  profile: PropTypes.object
}

export default ProfilesFeedItem
