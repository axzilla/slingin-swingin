const Conversation = require('../../models/Conversation')
const Message = require('../../models/Message')

async function messageCreate(req, res) {
  try {
    const { receiver, content } = req.body
    const sender = req.user._id.toString()
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
        .populate('users', '-password')
        .populate('messages')

      let receiverSockets = global.userSocketIdMap.get(receiver)
      if (receiverSockets) {
        for (let socketId of receiverSockets) {
          global.io.to(socketId).emit('chats', updatedConversation)
        }
      }

      res.json(updatedConversation)
    } else {
      const createdConversation = await Conversation.create({
        messages: createdMessage,
        users: participants
      })

      createdMessage.conversation = createdConversation._id
      createdMessage.save()

      const populatedConversation = await Conversation.findById(createdConversation._id)
        .populate('users', '-password')
        .populate('messages')

      let receiverSockets = global.userSocketIdMap.get(receiver)
      if (receiverSockets) {
        for (let socketId of receiverSockets) {
          global.io.to(socketId).emit('chats', populatedConversation)
        }
      }

      res.json(populatedConversation)
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = messageCreate
