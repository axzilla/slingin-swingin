import { colors } from '@material-ui/core'

const white = '#FFFFFF'
const black = '#000000'

export default {
  type: 'dark',
  primary: {
    contrastText: white,
    dark: colors.teal[400],
    main: colors.teal[300],
    light: colors.teal[200]
  },
  secondary: {
    contrastText: white,
    dark: colors.purple[400],
    main: colors.purple[300],
    light: colors.purple[200]
  },
  background: {
    default: colors.grey[900]
    // paper: colors.grey[700]
  }
}
