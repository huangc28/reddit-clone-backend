import http from 'http'
import app from './server'

const server = http.createServer(app)

const PORT = 3007

server.listen(PORT, () => {
  console.log(`server now hosted on port ${PORT}`)
})
