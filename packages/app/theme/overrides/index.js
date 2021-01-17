import MuiAppBar from './MuiAppBar'
import MuiCard from './MuiCard'
import MuiButton from './MuiButton'
import MuiCardContent from './MuiCardContent'
import MuiOutlinedInput from './MuiOutlinedInput'
import MuiInputLabel from './MuiInputLabel'

export default function overrides(globalTheme) {
  return {
    MuiAppBar,
    MuiCard,
    MuiButton,
    MuiCardContent,
    MuiOutlinedInput: MuiOutlinedInput(globalTheme),
    MuiInputLabel: MuiInputLabel(globalTheme)
  }
}
