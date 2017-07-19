import storage from './memCache'

/**
 * {
 *   id: 1,
 *   topic: 'apple is sweet',
 *   upvote: 1,
 *   downvote: 2,
 * },
 */
const dataList = [
  {
    id: 1,
    topic: 'apple is sweet',
    vote: 12,
  },
  {
    id: 2,
    topic: 'apple is sweet',
    vote: 98,
  }
]

describe('Threads cache operations', () => {
  beforeEach(() => {
    // initialize storage
    storage.init(dataList)
  })

  test('get all threads', () => {
    const storageData = storage.getAll()

    expect(storageData).toEqual(dataList)
  })

  test('get single thread', () => {
    const thread = storage.get(2)

    expect(thread).toEqual(dataList[1])
  })

  test('add single thread', () => {
    const newThread = {
      topic: 'seriously...I smell toot',
      vote: 23,
    }

    storage.add(newThread)

    const storageData = storage.getAll()

    expect(storageData.slice(0, 1)[0]).toEqual(
      Object.assign(newThread, { id: dataList.length })
    )
  })

  test('updating existing thread', () => {
    const updateThread = {
      id: 1,
      topic: 'Bryan is handsome',
      vote: 46,
    }

    storage.put(updateThread)

    const storageData = storage.getAll()

    const thread = storage.get(updateThread.id)

    expect(updateThread).toEqual(thread)
  })
})