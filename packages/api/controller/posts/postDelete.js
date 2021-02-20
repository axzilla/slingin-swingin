// Models
const Post = require('../../models/Post')
const PostComment = require('../../models/PostComment')
const MediaFile = require('../../models/MediaFile')

// Utils
const cloudinary = require('../../utils/cloudinary')

async function postDelete(req, res) {
  try {
    // delete post
    const deletedPost = await Post.findByIdAndDelete(req.body.postId)

    // delete post comments
    await PostComment.deleteMany({ post: deletedPost._id })

    // delete post mediafiles
    const foundMediaFiles = await MediaFile.find({ _id: { $in: deletedPost.mediaFiles } })
    await Promise.all(
      foundMediaFiles.map(async mediaFile => {
        await cloudinary.v2.uploader.destroy(mediaFile.cloudinary.public_id)
        const deletedMediaFile = await MediaFile.findByIdAndDelete(mediaFile._id)
        return deletedMediaFile
      })
    )

    res.json({ success: true })
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postDelete
