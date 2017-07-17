/**
 * Created a hash to store reddit threads.
 *
 * Storage format example:
 * [
 *   {
 *     id: 1,
 *     topic: 'apple is sweet',
 *     upvote: 1,
 *     downvote: 1,
 *   },
 *   {
 *     id: 2,
 *     topic: 'I smell baby barf'
 *     downvote: 1,
 *     downvote: 2,
 *   },
 *   ...
 * ]
 *
 * Usage:
 *
 * storage.init({...})
 *
 * storage.get()
 * storage.put({
 *  id: 1,
 *  topic: 'hello'
 *  downvote: 2
 * })
 */
let data = []

/**
 * Get the threads object.
 *
 * @param {Int} id
 * @returns {} || null
 */
export const get = id => {
  // if id exists in the storage, retrieve corresponding thread.
  const thread = data.find(thread => thread.id === id)

  return thread || null
 }

export const getAll = () => data

/**
 * @param {Int} id
 * @param {String} topic
 * @returns void
 */
export const put = ({ id, ...args}) => {
  const updatedData = data.map(thread => {
    if (thread.id === id) {
      return {
        ...thread,
        ...args,
      }
    }

    return thread
  })

  data = [...updatedData]
 }

/**
 * Append thread onto storage.
 *
 * @param {Object} thread
 * @returns void
 */
export const add = thread => {
  data = [
    ...data,
    {
      id: data.length + 1,
      ...thread,
    }
  ]
}

/**
 * Initialize storage.
 *
 * @param {Array} initData
 * @returns void
 */
export const init = (initData = []) => {
  // initialize data storage.
  data = initData
}

const storage = {
  data,
  getAll,
  get,
  put,
  add,
  init,
}

export default storage
