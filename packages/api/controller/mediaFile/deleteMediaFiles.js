// Models
const MediaFile = require('../../models/MediaFile')

// Utils
const cloudinary = require('../../utils/cloudinary')

async function deleteMediaFiles(req, res) {
  const { mediaFiles } = req.body

  try {
    const deletedMediaFiles = await Promise.all(
      mediaFiles.map(async mediaFile => {
        await cloudinary.v2.uploader.destroy(mediaFile.cloudinary.public_id)
        const deletedMediaFile = await MediaFile.findByIdAndDelete(mediaFile._id)
        return deletedMediaFile
      })
    )

    res.json(deletedMediaFiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = deleteMediaFiles
