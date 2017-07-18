import express from 'express'
import storage from './memCache'

const router = express.Router()

/**
 * Create topic api.
 *
 * params: topic
 */
router.post('/topic/create', (req, res, next) => {
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
      upvote: 0,
      downvote: 0,
    }

    storage.add(newThread)

    res.json({ status: 200, data: newThread })
  } catch (error) {
    next(new Error(error.message))
  }
})

router.get('/topics', (req, res, next) => {
  try {
    const topics = storage.getAll()
    res.json({
      status: 200,
      data: topics,
    })
  } catch (error) {
    next(new Error(error.message))
  }
})

/**
 * payload
 *  topic,
 *  upvote,
 *  downvote,
 */
router.put('/topic/:topicId', (req, res, next) => {
  const {
    params: {
      topicId
    } = {},
    body: {
      topic,
      upvote,
      downvote,
    },
  } = req

  // parse data to int.
  const intId = parseInt(topicId)
  const intUpvote = upvote ? parseInt(upvote) : upvote
  const intDownvote = downvote ? parseInt(downvote): downvote

  try {
    storage.put({
      id: intId,
      topic,
      upvote: intUpvote,
      downvote: intDownvote,
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