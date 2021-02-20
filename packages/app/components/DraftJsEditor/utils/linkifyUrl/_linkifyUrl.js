// Packages
import linkifyIt from 'linkify-it'

const linkifyUrl = new linkifyIt().add('ftp:', null).add('//', null)

export default linkifyUrl
