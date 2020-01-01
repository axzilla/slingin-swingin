import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import { WidgetLatestUsers } from '../'

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
      <WidgetLatestUsers />
    </div>
  )

  return (
    <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
      {sideList('right')}
    </Drawer>
  )
}

WidgetSidebarRight.propTypes = {
  state: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired
}

export default WidgetSidebarRight
