// Packages
import React from 'react'
import PropTypes from 'prop-types'

// Contexts
import { useAuth } from '../../contexts/auth'

// Material Styles
import { makeStyles } from '@material-ui/core/styles'

// Material Core
import { AppBar, Tabs, Tab } from '@material-ui/core'

// Features
import TabsPostPosts from './TabsPostPosts'
import TabsPostDrafts from './TabsPostDrafts'
import TabsPostBookmarks from './TabsPostBookmarks'
import TabsPostComments from './TabsPostComments'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  },
  appBar: {
    marginBottom: '20px'
  }
})

function TabsPost({ postsByUserId, postsDraftsByUserId, postsByUserBookmark, commentsByUserId }) {
  const { auth } = useAuth()
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange(event, newValue) {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="off"
        >
          <Tab label={`Veröffentlicht (${postsByUserId ? postsByUserId.length : 0})`} />
          <Tab label={`Entwürfe (${postsDraftsByUserId ? postsDraftsByUserId.length : 0})`} />
          <Tab label={`Lesezeichen (${postsByUserBookmark ? postsByUserBookmark.length : 0})`} />
          <Tab label={`Kommentare (${commentsByUserId ? commentsByUserId.length : 0})`} />
        </Tabs>
      </AppBar>
      {value === 0 && <TabsPostPosts postsByUserId={postsByUserId} auth={auth} />}
      {value === 1 && <TabsPostDrafts postsDraftsByUserId={postsDraftsByUserId} auth={auth} />}
      {value === 2 && <TabsPostBookmarks postsByUserBookmark={postsByUserBookmark} auth={auth} />}
      {value === 3 && <TabsPostComments commentsByUserId={commentsByUserId} />}
    </div>
  )
}

TabsPost.propTypes = {
  postsByUserId: PropTypes.array.isRequired,
  postsDraftsByUserId: PropTypes.array.isRequired,
  postsByUserBookmark: PropTypes.array.isRequired,
  commentsByUserId: PropTypes.array.isRequired
}

export default TabsPost
