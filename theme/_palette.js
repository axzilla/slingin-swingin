import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  type: 'light',
  white,
  black,
  primary: {
    contrastText: white,
    dark: colors.blue[400],
    main: colors.blue[300],
    light: colors.blue[200]
  },
  secondary: {
    contrastText: white,
    dark: colors.pink[700],
    main: colors.pink[600],
    light: colors.pink[500]
  },
  background: {
    // default: white
    // paper: colors.grey[700]
  },
  error: {
    contrastText: white,
    dark: colors.red[300],
    main: colors.red[300],
    light: colors.red[400]
  }
}
