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

    let receiverSockets = global.userSocketIdMap.get(sender)
    for (let socketId of receiverSockets) {
      global.io.to(socketId).emit('chats', updatedConversation)
    }

    res.json(updatedConversation)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = messageUpdate
