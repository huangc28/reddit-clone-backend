import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'

import apiRouters from './router'
import storage from './memCache'

/**
 * These threads as used as sample data for testing purpose.
 */
const defaultThreads = [
  {
    id: 1,
    topic: 'javascript ES6',
    upvote: 190,
    downvote: 0,
  },
  {
    id: 2,
    topic: 'react fiber',
    upvote: 23,
    downvote: 34,
  },
  {
    id: 1,
    topic: 'react native',
    upvote: 240,
    downvote: 3,
  },
]

storage.init(defaultThreads)

// initialize app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', apiRouters)

app.use((err, req, res, next) => {
  res
    .status(400)
    .json({
      error: {
        message: err.message,
      },
    })

  next()
})

export default app