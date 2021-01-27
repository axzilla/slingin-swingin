const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

async function messageUpdate(req, res) {
  try {
    const { receiver, sender, _id } = req.body.message
    const participants = [receiver, sender]

    await Message.findByIdAndUpdate(_id, { isSeen: true, dateIsSeen: Date.now() }, { new: true })

    const updatedConversation = await Conversation.findOne({ users: { $all: participants } })
      .populate('users', '-password')
      .populate('messages')

    global.io.in(updatedConversation._id).emit('update-conversation', updatedConversation)
    res.json('success')
  } catch (error) {
    if (error) throw error
  }
}

module.exports = messageUpdate
