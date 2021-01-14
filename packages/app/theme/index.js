import { createMuiTheme } from '@material-ui/core'

import palette from './_palette'
import overrides from './overrides'
import typography from './_typography'

export const theme = type => {
  return createMuiTheme({
    palette: { ...palette, type },
    overrides,
    typography
  })
}
