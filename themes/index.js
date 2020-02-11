import { createMuiTheme } from '@material-ui/core'

import typography from './_typography'
import paletteLight from './_paletteLight'
import paletteDark from './_paletteDark'

export const lightTheme = createMuiTheme({
  palette: paletteLight,
  typography
})

export const darkTheme = createMuiTheme({
  palette: paletteDark
})
