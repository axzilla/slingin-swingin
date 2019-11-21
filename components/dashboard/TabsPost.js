import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import AuthContext from '../../contexts/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import TabsPostPosts from './TabsPostPosts'
import TabsPostBookmarks from './TabsPostBookmarks'
import TabsPostComments from './TabsPostComments'

import { getCommentsByUserId } from '../comment/_services'
import { getSubCommentsByUserId } from '../subComment/_services'
import { getPostsByUserBookmark, getPostsByUserId } from '../post/_services'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: 'calc(100% - 240px)'
  },
  appBar: {
    marginBottom: '20px'
  }
})

function TabsPost() {
  const { user } = useContext(AuthContext)
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  function handleChange(event, newValue) {
    setValue(newValue)
  }

  const [postsByUserId, setPostsByUserId] = useState()
  const [postsByUserBookmark, setPostsByUserBookmark] = useState()
  const [commentsByUserId, setCommentsByUserId] = useState([])
  const [subCommentsByUserId, setSubCommentsByUserId] = useState([])

  useEffect(() => {
    getInitialData()
  }, [])

  useEffect(() => {
    getInitialData()
  }, [user.id])

  async function getInitialData() {
    try {
      const foundPostsByUserId = await getPostsByUserId(user.id)
      const foundPostsByUserBookmark = await getPostsByUserBookmark(user.id)
      const foundCommentsByUserId = await getCommentsByUserId(user.id)
      const foundSubCommentsByUserId = await getSubCommentsByUserId(user.id)

      setPostsByUserId(foundPostsByUserId.data)
      setPostsByUserBookmark(foundPostsByUserBookmark.data)
      setCommentsByUserId(foundCommentsByUserId.data)
      setSubCommentsByUserId(foundSubCommentsByUserId.data)
    } catch (error) {
      if (error) throw error
    }
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
          <Tab
            label={`Kommentare (${
              commentsByUserId && subCommentsByUserId
                ? commentsByUserId.length + subCommentsByUserId.length
                : 0
            })`}
          />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabsPostPosts postsByUserId={postsByUserId} setPostsByUserId={setPostsByUserId} />
      )}
      {value === 1 && (
        <TabsPostBookmarks
          postsByUserBookmark={postsByUserBookmark}
          setPostsByUserBookmark={setPostsByUserBookmark}
        />
      )}
      {value === 2 && (
        <TabsPostComments
          commentsByUserId={commentsByUserId}
          subCommentsByUserId={subCommentsByUserId}
        />
      )}
    </div>
  )
}

TabsPost.propTypes = {
  postsByUserId: PropTypes.array,
  setPostsByUserId: PropTypes.func,
  postsByUserBookmark: PropTypes.array,
  setPostsByUserBookmark: PropTypes.func,
  commentsByUserId: PropTypes.array,
  subCommentsByUserId: PropTypes.array
}

export default TabsPost
