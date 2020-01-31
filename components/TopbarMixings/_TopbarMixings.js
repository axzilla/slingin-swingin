import React from 'react'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  toolbar: { ...theme.mixins.toolbar }
}))

function TopbarMixings() {
  const classes = useStyles()

  return <div className={classes.toolbar} />
}

export default TopbarMixings
