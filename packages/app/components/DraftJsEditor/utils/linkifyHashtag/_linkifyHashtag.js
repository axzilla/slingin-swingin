// Packages
import linkifyIt from 'linkify-it'

const linkifyHashtag = new linkifyIt()
  .add('ftp:', null)
  .add('http:', null)
  .add('https:', null)
  .add('//', null)
  .add('#', {
    validate: function (text, pos, self) {
      var tail = text.slice(pos)

      if (!self.re.twitter) {
        self.re.twitter = new RegExp('^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')')
      }
      if (self.re.twitter.test(tail)) {
        // Linkifier allows punctuation chars before prefix,
        // but we additionally disable `@` ("@@mention" is invalid)
        if (pos >= 2 && tail[pos - 2] === '#') {
          return false
        }
        return tail.match(self.re.twitter)[0].length
      }
      return 0
    },
    normalize: function (match) {
      match.hashtag = match.url.replace(/^#/, '')
    }
  })

export default linkifyHashtag
