// Packages
import React from 'react'
import Moment from 'react-moment'
import 'moment/locale/de'

// Components
import Link from '../../components/Link'

// Material Core
import { Typography } from '@material-ui/core'

const SubCommentFeedItemDate = ({ subComment }) => {
  return (
    <Typography variant="caption" style={{ fontWeight: '300' }}>
      <Moment format="D MMM YYYY" locale="de">
        {subComment.dateCreated}
      </Moment>
    </Typography>
  )
}

export default SubCommentFeedItemDate
