import MuiAppBar from './MuiAppBar'
import MuiMenu from './MuiMenu'
import MuiDialog from './MuiDialog'
import MuiCard from './MuiCard'
import MuiButton from './MuiButton'
import MuiCardContent from './MuiCardContent'
import MuiOutlinedInput from './MuiOutlinedInput'
import MuiInputLabel from './MuiInputLabel'
import MuiBottomNavigationAction from './MuiBottomNavigationAction'

export default function overrides(globalTheme) {
  return {
    MuiMenu,
    MuiAppBar,
    MuiDialog,
    MuiCard,
    MuiButton,
    MuiCardContent,
    MuiOutlinedInput: MuiOutlinedInput(globalTheme),
    MuiInputLabel: MuiInputLabel(globalTheme),
    MuiBottomNavigationAction: MuiBottomNavigationAction(globalTheme)
  }
}
