import React from 'react'

import { makeStyles } from '@material-ui/styles'

import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey
} from '@material-ui/core/colors'

const colors = [
  red[500],
  pink[500],
  purple[500],
  deepPurple[500],
  indigo[500],
  blue[500],
  lightBlue[500],
  cyan[500],
  teal[500],
  green[500],
  lightGreen[500],
  lime[500],
  yellow[500],
  amber[500],
  orange[500],
  deepOrange[500],
  brown[500],
  grey[500],
  blueGrey[500]
]

const randomColorIndex = Math.floor(Math.random() * colors.length)
const randomColor = colors[randomColorIndex]

const useStyles = makeStyles({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: ({ size }) => size,
    width: ({ size }) => size,
    borderRadius: '50%',
    border: ({ profileColor, border }) =>
      `${border} solid ${profileColor || randomColor}`
  },
  char: {
    textTransform: 'uppercase',
    color: ({ profileColor }) => profileColor || randomColor,
    fontWeight: 'bold',
    fontSize: ({ fontSize }) => fontSize
  }
})

const CharAvatar = ({ size, fontSize, charString, profileColor, border }) => {
  const classes = useStyles({ size, fontSize, profileColor, border })

  return (
    <div className={classes.avatar}>
      <p className={classes.char}>{charString.substring(0, 1)}</p>
    </div>
  )
}

export default CharAvatar
