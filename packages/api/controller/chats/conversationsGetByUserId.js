const Conversation = require('../../models/Conversation')

async function conversationsGetByUserId(req, res) {
  try {
    const userId = req.user.id

    const foundConversations = await Conversation.find({
      users: { $in: userId }
    })
      .populate({ path: 'users', populate: { path: 'profile' } })
      .populate('messages')

    res.json(foundConversations)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = conversationsGetByUserId
