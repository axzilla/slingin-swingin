import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

import Link from '@components/Link'

import Avatar from '@material-ui/core/Avatar'
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
            {profile.user.avatar && profile.user.avatar.secure_url ? (
              <Avatar alt={profile.user.username} src={profile.user.avatar.secure_url} />
            ) : (
              <Avatar alt={profile.user.username}>
                {profile.user.username.substring(0, 1).toUpperCase()}
              </Avatar>
            )}
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
