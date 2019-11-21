import React from 'react'
import PropTypes from 'prop-types'

import { getStudentProfileByProfileId } from '../../../services/studentProfile'
import { isNotLoggedIn } from '../../../utils/initialize'

import StudentProfile from '../../../components/StudentProfile'

function Profile({ profile }) {
  return <StudentProfile profile={profile} />
}

Profile.propTypes = {
  profile: PropTypes.object
}

Profile.getInitialProps = async ctx => {
  try {
    isNotLoggedIn(ctx)
    const { profileId } = ctx.query
    const res = await getStudentProfileByProfileId(profileId)
    const profile = res.data

    return {
      profile
    }
  } catch (error) {
    if (error) throw error
  }
}

export default Profile
