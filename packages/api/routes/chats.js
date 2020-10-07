const express = require('express')
const router = express.Router()
const authenticate = require('../utils/authenticate')

const messageCreate = require('../controller/chats/messageCreate')
const messageDelete = require('../controller/chats/messageDelete')
const messageUpdate = require('../controller/chats/messageUpdate')
const conversationsGetByUserId = require('../controller/chats/conversationsGetByUserId')

router.post('/message-create', authenticate(), messageCreate)
router.post('/message-delete', authenticate(), messageDelete)
router.post('/message-update', authenticate(), messageUpdate)
router.post('/conversations-get-by-user-id', authenticate(), conversationsGetByUserId)

module.exports = router
