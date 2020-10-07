import { createMuiTheme } from '@material-ui/core'

import typography from './_typography'
import palette from './_palette'
import overrides from './overrides'

export const theme = type => {
  return createMuiTheme({
    palette: { ...palette, type },
    typography,
    overrides
  })
}
