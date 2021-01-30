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
    if (error) throw error
  }
}

module.exports = conversationsGetByUserId
