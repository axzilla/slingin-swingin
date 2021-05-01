const Conversation = require('../../models/Conversation')

async function conversationsGetByUserId(req, res) {
  try {
    const userId = req.user._id

    const foundConversations = await Conversation.find({
      users: { $in: userId }
    })
      .populate('users', '-password')
      .populate('messages')

    res.json(foundConversations)
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = conversationsGetByUserId
