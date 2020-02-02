function htmlRemove(text) {
  var stripedHtml = text.replace(/<[^>]+>/g, ' ')
  return stripedHtml
}

export default htmlRemove
