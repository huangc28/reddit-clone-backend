/**
 * Integration test for reddit-clone apis
 *
 * APIs:
 *  - create/topic
 *  - topics
 */
import request from 'supertest'
import faker from 'faker'

import storage from './memCache'
import app from './index'

afterEach(() => {
  // clear storage
  storage.init([])
})

describe('POST /api/topic', () => {
  test('create topic failed, topic not provided', done => {

    request(app)
      .post('/api/topic')
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
      }
    }

    // .field does not work, use send to post.
    // @issue: https://github.com/visionmedia/supertest/issues/189
    request(app)
      .post('/api/topic')
      .type('form')
      .send({ topic: expectedResponse.data.topic })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toEqual({
          status: expectedResponse.status,
          data: {
            id: 1,
            ...expectedResponse.data,
            vote: 0,
          },
        })

        done()
      })
  })
})

describe('PUT /topics/:topicId', () => {
  test('upvote thread success', done => {
    const seed = {
      id: 100,
      topic: 'sample thread',
      vote: 888,
    }
    // seed fake data.
    storage.init([ seed ])

    // client has to post the original data alone with the new piece of data
    // or I'll have to do a shallow comparison to find the diff of two objects.
    const updatedPart = {
      topic: 'this topic is boring',
      vote: seed.vote + 1,
    }

    // upvote thread
    request(app)
      .put(`/api/topic/${100}`)
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


describe('GET /api/topics', () => {
  test('get all threads success', done => {
    // seed a list of data
    const threadList = [
      {
        id: 3,
        topic: 'graphQL',
        vote: 44,
      },
      {
        id: 2,
        topic: 'postgres',
        vote: 33,
      },
      {
        id: 1,
        topic: 'javascript es6',
        vote: 10,
      },
    ]

    storage.init(threadList)

    request(app)
      .get('/api/topics')
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(threadList)

        done()
      })
  })

  test('only the first 20 topics will be retrieved and sorted by vote', done => {
    const fakeTopics = []

    // seed 30 fake data into fake topics
    for (let i = 0; i < 29; ++i) {
      fakeTopics.push({
        id: i + 1,
        topic: faker.lorem.sentence(),
        vote: faker.random.number(),
      })
    }

    storage.init(fakeTopics)

    request(app)
      .get('/api/topics')
      .expect(200)
      .end((err, res) => {
        // expect body length to be exactly 20
        expect(res.body.data.length).toBe(20)

        // expect the body is sorted by vote
        const sortedFakeTopics = fakeTopics
          .slice(0, 20)
          .sort((t1, t2) => t2.vote - t1.vote)

        expect(res.body.data).toEqual(sortedFakeTopics)

        done()
      })
  })
})