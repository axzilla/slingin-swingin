// https://mhagemann.medium.com/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1

// function slugify(string) {
//   // const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:'
//   // const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/,:'
//   const a = 'àáâãèéëêìíïîòóôùúûñçÿœæŕśńṕẃǵǹḿǘẍźḧ·/:'
//   const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
//   const p = new RegExp(a.split('').join('|'), 'g')

//   return (
//     string
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, '-') // Replace spaces with -
//       .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
//       .replace(/&/g, '-and-') // Replace & with 'and'
//       .replace(/,/g, '-') // Replace , with '-'
//       .replace(/ä/g, 'ae') // Replace ä with 'ae'
//       .replace(/ö/g, 'oe') // Replace ö with 'oe'
//       .replace(/ü/g, 'ue') // Replace ü with 'ue'
//       .replace(/ß/g, 'ss') // Replace ß with 'ss'
//       // eslint-disable-next-line
//       .replace(/[^\w\-]+/g, '') // Remove all non-word characters
//       // eslint-disable-next-line
//       .replace(/\-\-+/g, '-') // Replace multiple - with single -
//       .replace(/^-+/, '') // Trim - from start of text
//       .replace(/-+$/, '')
//   ) // Trim - from end of text
// }

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
    .replace(/á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
    .replace(/ö|ő|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
    .replace(/ü|ű|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
    .replace(/í/gi, 'i')
    .replace(/đ/gi, 'd')
    .replace(/ļ/gi, 'l')
    .replace(/\s*$/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '') // eslint-disable-line
    .replace(/\-\-+/g, '-') // eslint-disable-line
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

module.exports = slugify
