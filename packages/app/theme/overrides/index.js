import MuiAppBar from './MuiAppBar'
import MuiDialog from './MuiDialog'
import MuiCard from './MuiCard'
import MuiButton from './MuiButton'
import MuiCardContent from './MuiCardContent'
import MuiOutlinedInput from './MuiOutlinedInput'
import MuiInputLabel from './MuiInputLabel'

export default function overrides(globalTheme) {
  return {
    MuiAppBar,
    MuiDialog,
    MuiCard,
    MuiButton,
    MuiCardContent,
    MuiOutlinedInput: MuiOutlinedInput(globalTheme),
    MuiInputLabel: MuiInputLabel(globalTheme)
  }
}
