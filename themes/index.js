import { createMuiTheme } from '@material-ui/core'

import overrides from './overrides'
import palette from './_palette'
import typography from './_typography'

export const lightTheme = createMuiTheme({
  palette: { ...palette, type: 'light' },
  typography,
  overrides
})

export const darkTheme = createMuiTheme({
  palette: { ...palette, type: 'dark' },
  typography,
  overrides
})
