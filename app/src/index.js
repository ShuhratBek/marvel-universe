import mongoose from 'mongoose'
import util from 'util'
import app from './config/express'
import bluebird from 'bluebird'
import config from './config/env'

const debug = require('debug')('marvel-universe')

// connect to mongo db
mongoose.connect(config.db.uri)
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db.uri}`)
})

// print mongoose logs in dev env
if (config.db.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}
// listen on port
app.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`)
})

export default app
