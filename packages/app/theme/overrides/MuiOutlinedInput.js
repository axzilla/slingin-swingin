export default function MuiOutlinedInput(globalTheme) {
  return {
    root: {
      borderRadius: '10px',
      '&:hover $notchedOutline': {
        borderColor: globalTheme.palette.text.primary
      },
      '&$focused $notchedOutline': {
        borderColor: globalTheme.palette.text.primary
      }
    }
  }
}
