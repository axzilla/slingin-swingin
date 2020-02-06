import { createMuiTheme } from '@material-ui/core'

import overrides from './overrides'
import paletteLight from './_paletteLight'
import paletteDark from './_paletteDark'
import typography from './_typography'

export const lightTheme = createMuiTheme({
  palette: paletteLight,
  typography,
  overrides
})

export const darkTheme = createMuiTheme({
  palette: paletteDark,
  typography,
  overrides
})
