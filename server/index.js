import 'babel-polyfill'
import express from 'express'
import bodyParser from 'body-parser'

import apiRouters from './router'
import storage from './memCache'

storage.init([])

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