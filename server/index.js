import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import apiRouters from './router'
import storage from './memCache'

/**
 * These threads as used as sample data for testing purpose.
 */
const defaultThreads = [
  {
    id: 1,
    topic: 'javascript ES6',
    vote: 109,
  },
  {
    id: 2,
    topic: 'react fiber',
    vote: 200,
  },
  {
    id: 1,
    topic: 'react native',
    vote: 234,
  },
]

storage.init(defaultThreads)

// initialize app
const app = express()

// enable cors for all origins
app.use(cors())

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