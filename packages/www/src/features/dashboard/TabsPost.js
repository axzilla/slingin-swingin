// Packages
import React from 'react'

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

function TabsPost({ post, profile, comments }) {
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
          <Tab
            label={`Veröffentlicht (${
              post.postsByUserId ? post.postsByUserId.length : 0
            })`}
          />
          <Tab
            label={`Entwürfe (${
              post.postsDraftsByUserId ? post.postsDraftsByUserId.length : 0
            })`}
          />
          <Tab
            label={`Lesezeichen (${
              post.postsByUserBookmark ? post.postsByUserBookmark.length : 0
            })`}
          />
          <Tab
            label={`Kommentare (${
              comments.commentsByUserId ? comments.commentsByUserId.length : 0
            })`}
          />
        </Tabs>
      </AppBar>
      {value === 0 && <TabsPostPosts post={post} profile={profile} />}
      {value === 1 && <TabsPostDrafts post={post} profile={profile} />}
      {value === 2 && <TabsPostBookmarks post={post} profile={profile} />}
      {value === 3 && (
        <TabsPostComments comments={comments} profile={profile} />
      )}
    </div>
  )
}

export default TabsPost
