import { createMuiTheme } from '@material-ui/core'

import palette from './_palette'
import overrides from './overrides'
import typography from './_typography'

export const theme = type => {
  const globalTheme = createMuiTheme({ palette: { ...palette, type } })

  const theme = createMuiTheme({
    ...globalTheme,
    overrides: overrides(globalTheme),
    typography
  })

  return { globalTheme, theme }
}
