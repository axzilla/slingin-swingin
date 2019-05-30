module.exports = slugify = string => {
  // const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:'
  // const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/,:'
  const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/:'
  const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/,/g, '-') // Replace , with '-'
    .replace(/ä/g, 'ae') // Replace ä with 'ae'
    .replace(/ö/g, 'oe') // Replace ö with 'oe'
    .replace(/ü/g, 'ue') // Replace ü with 'ue'
    .replace(/ß/g, 'ss') // Replace ß with 'ss'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}