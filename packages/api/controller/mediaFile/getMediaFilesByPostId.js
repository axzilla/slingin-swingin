// Models
const MediaFile = require('../../models/MediaFile')

async function getMediaFilesByPostId(req, res) {
  try {
    const { postId } = req.params
    const foundMediaFiles = await MediaFile.find({ post: postId })
    res.json(foundMediaFiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getMediaFilesByPostId
