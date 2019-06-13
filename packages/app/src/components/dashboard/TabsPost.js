import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/auth'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import TabsPostPosts from './TabsPostPosts'
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

function TabsPost({
  postsByUserId,
  setPostsByUserId,
  postsByUserBookmark,
  setPostsByUserBookmark,
  commentsByUserId
}) {
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
          <Tab label={`Lesezeichen (${postsByUserBookmark ? postsByUserBookmark.length : 0})`} />
          <Tab label={`Kommentare (${commentsByUserId ? commentsByUserId.length : 0})`} />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabsPostPosts
          postsByUserId={postsByUserId}
          setPostsByUserId={setPostsByUserId}
          auth={auth}
        />
      )}
      {value === 1 && (
        <TabsPostBookmarks
          postsByUserBookmark={postsByUserBookmark}
          setPostsByUserBookmark={setPostsByUserBookmark}
          auth={auth}
        />
      )}
      {value === 2 && <TabsPostComments commentsByUserId={commentsByUserId} />}
    </div>
  )
}

TabsPost.propTypes = {
  postsByUserId: PropTypes.array,
  setPostsByUserId: PropTypes.func,
  postsByUserBookmark: PropTypes.array,
  setPostsByUserBookmark: PropTypes.func,
  commentsByUserId: PropTypes.array
}

export default TabsPost
