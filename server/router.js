import express from 'express'
import storage from './memCache'

const router = express.Router()

/**
 * Create topic api.
 *
 * params: topic
 */
router.post('/topic', (req, res, next) => {
  const {
    body: {
      topic
    } = {}
  } = req

  // if topic does not exists, pass on to the error handler.
  if (!topic || topic === '') {
    next(new Error('topic content does not exist'))

    return
  }

  // this isn't a real I/O or DB operation
  // thus, error shouldn't be happening but for the sake
  // of completeness, we still put it in try...catch block.
  try {
    const newThread = {
      topic,
      vote: 0,
    }

    storage.add(newThread)

    res.json({ status: 200, data: storage.getLatest() })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/topics', (req, res, next) => {
  try {
    const topics = storage.getAll()

    // take first 20, sort the array by vote
    const sortedArray = topics
      .slice(0, 19)
      .sort((t1, t2) => t2.vote - t1.vote)

    res.json({
      status: 200,
      data: sortedArray,
    })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.put('/topic/:topicId', (req, res, next) => {
  const {
    params: {
      topicId
    } = {},
    body: {
      topic,
      vote,
    } = {},
  } = req

  // if topicId is not present, throw an Exception
  if (!topicId) {
    next(new Error('topic id is not provided'))
  }

  // parse data to int.
  const intId = parseInt(topicId, 10)

  try {
    storage.put({
      id: intId,
      topic,
      vote: parseInt(vote, 10),
    })

    res.json({
      status: 200,
      data: storage.get(intId),
    })
  } catch (error) {
    next(new Error(error.message))
  }
})

export default router