const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

async function messageCreate(req, res) {
  try {
    const { receiver, content } = req.body
    const sender = req.user.id
    const participants = [receiver, sender]

    const foundConversation = await Conversation.findOne({ users: { $all: participants } })
    const createdMessage = await Message.create({ content, sender, receiver })

    if (foundConversation) {
      foundConversation.messages.push(createdMessage._id)
      foundConversation.dateUpdated = Date.now()
      await foundConversation.save()

      createdMessage.conversation = foundConversation._id
      createdMessage.save()

      const updatedConversation = await Conversation.findOne({ users: { $all: participants } })
        .populate({ path: 'users', populate: { path: 'profile' } })
        .populate('messages')

      global.io.in(updatedConversation._id).emit('update-conversation', updatedConversation)
      res.json('success')
    } else {
      const createdConversation = await Conversation.create({
        messages: createdMessage,
        users: participants
      })

      createdMessage.conversation = createdConversation._id
      createdMessage.save()
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = messageCreate
