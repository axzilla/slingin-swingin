import { createMuiTheme } from '@material-ui/core'

import overrides from './overrides'
import palette from './_palette'
import typography from './_typography'

const theme = createMuiTheme({
  palette,
  typography,
  overrides
})

export default theme
