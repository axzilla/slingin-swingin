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

function TabsPost({
  postsByUserId,
  postsDraftsByUserId,
  postsByUserBookmark,
  commentsByUserId,
  currentUserId
}) {
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
              postsByUserId ? postsByUserId.length : 0
            })`}
          />
          <Tab
            label={`Entwürfe (${
              postsDraftsByUserId ? postsDraftsByUserId.length : 0
            })`}
          />
          <Tab
            label={`Lesezeichen (${
              postsByUserBookmark ? postsByUserBookmark.length : 0
            })`}
          />
          <Tab
            label={`Kommentare (${
              commentsByUserId ? commentsByUserId.length : 0
            })`}
          />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabsPostPosts
          postsByUserId={postsByUserId}
          currentUserId={currentUserId}
        />
      )}
      {value === 1 && (
        <TabsPostDrafts
          postsDraftsByUserId={postsDraftsByUserId}
          currentUserId={currentUserId}
        />
      )}
      {value === 2 && (
        <TabsPostBookmarks
          postsByUserBookmark={postsByUserBookmark}
          currentUserId={currentUserId}
        />
      )}
      {value === 3 && <TabsPostComments commentsByUserId={commentsByUserId} />}
    </div>
  )
}

export default TabsPost
