export default function MuiBottomNavigationAction(globalTheme) {
  return {
    root: {
      // color: globalTheme.palette.secondary.main,
      '&$selected': {
        color: globalTheme.palette.secondary.main
      }
    }
  }
}
