const app = require('./_app')

const port = process.env.PORT || 5000

const server = app.listen(port, () => console.log(`Server running on port ${port}`)) // eslint-disable-line no-console
const io = require('socket.io')(server, { cors: { origin: '*' } })

module.exports = io
