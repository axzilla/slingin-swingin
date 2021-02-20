// Models
const MediaFile = require('../../models/MediaFile')

// Utils
const cloudinary = require('../../utils/cloudinary')

async function createMediaFiles(req, res) {
  try {
    const { referenceType, postId } = req.body
    const { _id: user } = req.user

    let folder

    if (referenceType === 'post') {
      folder = process.env.CLOUDINARY_PATH_POST_MEDIAFILES
    }

    const createdMediaFiles = await Promise.all(
      req.files.map(async mediaFile => {
        const { mimetype, buffer } = mediaFile
        const convertedMediaFile = `data:${mimetype};base64,${buffer.toString('base64')}`

        const uploadedMediaFile = await cloudinary.v2.uploader.upload(convertedMediaFile, {
          folder
        })

        const createdMediaFile = await MediaFile.create({
          cloudinary: uploadedMediaFile,
          post: postId,
          user
        })

        return createdMediaFile
      })
    )

    res.json(createdMediaFiles)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = createMediaFiles
