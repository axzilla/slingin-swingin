export default function MuiOutlinedInput(globalTheme) {
  return {
    root: {
      '&:hover $notchedOutline': {
        borderColor: globalTheme.palette.text.primary
      },
      '&$focused $notchedOutline': {
        borderColor: globalTheme.palette.text.primary
      }
    }
  }
}
