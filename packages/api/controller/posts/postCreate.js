// Models
const Post = require('../../models/Post')

async function postCreate(req, res) {
  try {
    const { contentRaw, contentText, hashtags, mediaFiles, gif, _id, place } = req.body

    const createdPost = await Post.create({
      _id,
      user: req.user._id,
      contentRaw,
      contentText,
      hashtags,
      mediaFiles,
      gif,
      place
    })

    // await updateUser(req, createdPost)
    // await sendMails(createdPost)
    res.json(createdPost)
  } catch (error) {
    if (error) throw error
  }
}

// async function updateUser(req, createdPost) {
//   await User.findByIdAndUpdate(req.user._id, { $push: { posts: createdPost._id } })
// }

// async function sendMails(createdPost) {
//   // Send Mail to User - New POST - If onNewPost
//   const foundUsers = await User.find()

//   foundUsers
//     .filter(user => user.notifications.onNewPost)
//     .map(user => sendPostCreate(transporter, createdPost, user))
// }

module.exports = postCreate
