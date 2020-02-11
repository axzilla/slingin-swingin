import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  type: 'light',
  primary: {
    contrastText: white,
    dark: colors.teal[400],
    main: colors.teal[300],
    light: colors.teal[200]
  },
  secondary: {
    contrastText: white,
    dark: colors.grey[700],
    main: colors.grey[600],
    light: colors.grey[500]
  },
  background: {
    default: white
    // paper: colors.grey[700]
  },
  error: {
    contrastText: white,
    dark: colors.red[300],
    main: colors.red[300],
    light: colors.red[400]
  }
}
