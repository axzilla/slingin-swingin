function htmlToMui(text) {
  const replacedText = text
    .replace(
      /<a /g,
      '<a class="MuiTypography-root MuiLink-root MuiLink-underlineHover makeStyles-link-159 MuiTypography-colorPrimary"'
    )
    .replace(/<p>/g, '<p class="MuiTypography-root MuiTypography-body1">')
    .replace(/<h1>/g, '<p class="MuiTypography-root MuiTypography-h1">')
    .replace(/<h2>/g, '<p class="MuiTypography-root MuiTypography-h2">')
    .replace(/<h3>/g, '<p class="MuiTypography-root MuiTypography-h3">')
    .replace(/<h4>/g, '<p class="MuiTypography-root MuiTypography-h4">')
    .replace(/<h5>/g, '<p class="MuiTypography-root MuiTypography-h5">')
    .replace(/<h6>/g, '<p class="MuiTypography-root MuiTypography-h6">')
    .replace(/<p><br><\/p>/g, '<p class="MuiTypography-root MuiTypography-h6">')

  return replacedText
}

export default htmlToMui
