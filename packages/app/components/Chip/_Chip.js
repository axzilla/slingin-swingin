import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import MuiChip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  chip: {
    borderRadius: '10px',
    border: `1px solid ${fade(theme.palette.text.primary, 0.23)}`,
    margin: theme.spacing(0, 0.5, 0.5, 0),
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
}))

function Chip({ icon, label, onClick, onDelete, color, deleteIcon, variant, href, clickable }) {
  const classes = useStyles()

  return (
    <MuiChip
      classes={{ root: classes.root, label: classes.label }}
      className={classes.chip}
      icon={icon}
      label={label}
      onClick={onClick}
      onDelete={onDelete}
      color={color}
      deleteIcon={deleteIcon}
      variant={variant}
      href={href}
      clickable={clickable}
    />
  )
}

Chip.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  color: PropTypes.string,
  deleteIcon: PropTypes.element,
  variant: PropTypes.string,
  href: PropTypes.string,
  clickable: PropTypes.bool
}

export default Chip
