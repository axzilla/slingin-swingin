import { createMuiTheme } from '@material-ui/core'

import overrides from './overrides'
import paletteLight from './_paletteLight'
import paletteDark from './_paletteDark'

export const lightTheme = createMuiTheme({
  palette: paletteLight,
  overrides
})

export const darkTheme = createMuiTheme({
  palette: paletteDark,
  overrides
})
