import { fade } from '@material-ui/core/styles/colorManipulator'
import palette from '../_palette'

export default {
  root: {
    boxShadow: 'none',
    borderBottom: `1px solid ${fade(palette.white, 0.1)}`
  }
}
