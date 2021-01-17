export default function MuiInputLabel(globalTheme) {
  return {
    root: {
      color: globalTheme.palette.text.primary,
      '&.Mui-focused': {
        color: globalTheme.palette.text.primary
      }
    }
  }
}
