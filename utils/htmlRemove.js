function htmlRemove(content) {
  var stripedHtml = content.replace(/<[^>]+>/g, '')
  return stripedHtml
}

export default htmlRemove
