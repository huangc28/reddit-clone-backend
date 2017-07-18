/**
 * Integration test for reddit-clone apis
 *
 * APIs:
 *  - create/topic
 *  - topics
 */
import request from 'supertest';

import storage from './memCache'
import app from './index'

afterEach(() => {
  // clear storage
  storage.init([])
})

describe('POST create/topic', () => {
  test('create topic failed, topic not provided', done => {

    request(app)
      .post('/topic/create')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect(res.body.error.message).toBe('topic content does not exist')

        done()
      })
  })

  test('create topic success', done => {
    const expectedResponse = {
      status: 200,
      data: {
        topic: 'really, stop it... I smell toot',
        upvote: 0,
        downvote: 0
      }
    }

    // .field does not work, use send to post.
    // @issue: https://github.com/visionmedia/supertest/issues/189
    request(app)
      .post('/topic/create')
      .type('form')
      .send({ topic: expectedResponse.data.topic })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual(expectedResponse)

        done()
      })
  })
})

describe('PUT /topics/:topicId', () => {
  test('upvote thread success', done => {
    const seed = {
      id: 100,
      topic: 'sample thread',
      upvote: 123,
      downvote: 321,
    }
    // seed fake data.
    storage.init([ seed ])

    // client has to post the original data alone with the new piece of data
    // or I'll have to do a shallow comparison to find the diff of two objects.
    const updatedPart = {
      topic: 'this topic is boring',
      upvote: 777, // increase in value
      downvote: 321
    }

    // upvote thread
    request(app)
      .put(`/topic/${100}`)
      .type('form')
      .send(updatedPart)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(
          {
            ...seed,
            ...updatedPart,
          }
        )

        done()
      })
  })
})


describe('GET /topics', () => {
  test('get all threads success', done => {
    // seed a list of data
    const threadList = [
      {
        id: 1,
        topic: 'javascript es6',
        upvote: 10,
        downvote: 12,
      },
      {
        id: 2,
        topic: 'postgres',
        upvote: 13,
        downvote: 14,
      },
      {
        id: 3,
        topic: 'graphQL',
        upvote: 15,
        downvote: 16,
      },
    ]

    storage.init(threadList)

    request(app)
      .get('/topics')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(threadList)

        done()
      })
  })
})