import { createMuiTheme } from '@material-ui/core/styles'

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#212121'
    },
    secondary: {
      main: '#f44336'
    }
  },
  typography: {
    useNextVariants: true
  }
})

export default lightTheme
