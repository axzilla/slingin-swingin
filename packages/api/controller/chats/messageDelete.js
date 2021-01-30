const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

async function messageDelete(req, res) {
  try {
    const { messageId } = req.body
    const deletedMessage = await Message.findOneAndDelete({ _id: messageId })

    const updatedConversation = await Conversation.findById(deletedMessage.conversation)

    const messageIndex = updatedConversation.messages.indexOf(deletedMessage._id)
    updatedConversation.messages = [
      ...updatedConversation.messages.slice(0, messageIndex),
      ...updatedConversation.messages.slice(messageIndex + 1)
    ]

    await updatedConversation.save()

    const foundConversation = await Conversation.findById(deletedMessage.conversation)
      .populate('users', '-password')
      .populate('messages')

    global.io
      .to(`chats-${deletedMessage.receiver}`)
      .to(`chats-${deletedMessage.sender}`)
      .emit('chats', foundConversation)

    res.json('success')
  } catch (error) {
    if (error) throw error
  }
}

module.exports = messageDelete
