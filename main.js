const client = require('./client')
const log = require('./logger')
require('dotenv').config()


require('./db.js')


require('./handlers/events')
require('./handlers/commands')

try {
    client.login(process.env.TOKEN)
} catch (error) {
    log.error(error)
}