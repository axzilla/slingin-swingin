function htmlToMui(content) {
  const replacedContent = content
    .replace(
      /<a /g,
      '<a target="_blank" class="MuiTypography-root MuiLink-root MuiLink-underlineHover makeStyles-link-159 MuiTypography-colorTextPrimary"'
    )
    .replace(
      /<p>/g,
      '<p class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-body1">'
    )
    .replace(/<h1>/g, '<h1 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h1">')
    .replace(/<h2>/g, '<h2 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h2">')
    .replace(/<h3>/g, '<h3 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h3">')
    .replace(/<h4>/g, '<h4 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h4">')
    .replace(/<h5>/g, '<h5 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h5">')
    .replace(/<h6>/g, '<h6 class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h6">')
    .replace(
      /<p><br><\/p>/g,
      '<p class="MuiTypography-gutterBottom MuiTypography-root MuiTypography-h6">'
    )

  return replacedContent
}

export default htmlToMui
