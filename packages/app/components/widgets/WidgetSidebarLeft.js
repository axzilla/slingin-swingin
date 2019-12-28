import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import WidgetTopPostsTags from './WidgetTopPostsTags'

const useStyles = makeStyles({
  list: {
    width: 300
  }
})

function WidgetSidebarRight({ state, toggleDrawer }) {
  const classes = useStyles()

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <WidgetTopPostsTags />
    </div>
  )

  return (
    <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
      {sideList('left')}
    </Drawer>
  )
}

WidgetSidebarRight.propTypes = {
  state: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default WidgetSidebarRight
