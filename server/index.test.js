/**
 * Integration test for reddit-clone apis
 *
 * APIs:
 *  - create/topic
 *  - topics
 */
import request from 'supertest';

import app from './index'

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