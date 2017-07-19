/**
 * Created a hash to store reddit threads.
 *
 * Storage format example:
 * [
 *   {
 *     id: 1,
 *     topic: 'apple is sweet',
 *     vote: 3,
 *   },
 *   {
 *     id: 2,
 *     topic: 'I smell baby barf'
 *     vote: 4,
 *   },
 *   ...
 * ]
 *
 * Usage:
 *
 * storage.init([...])
 *
 * storage.get()
 * storage.put({
 *  id: 1,
 *  topic: 'hello'
 *  vote: 3
 * })
 *
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

export const getLatest = () => data.slice(0, 1)[0]

/**
 * @param {Int} id
 * @param {String} topic
 * @returns void
 *
 * @TODO only update those attribute that contains truthy value.
 */
export const put = ({ id, ...args}) => {
  // if the value on the attribute in args object isn't truthy
  // we don't replace the origin data.
  const updateArgs = {}

  Object.keys(args)
    .filter(key => !!args[key])
    .forEach(key => updateArgs[key] = args[key])

  const updatedData = data.map(thread => {
    if (thread.id === id) {
      return {
        ...thread,
        ...updateArgs,
      }
    }

    return thread
  })

  data = [...updatedData]
 }

/**
 * Append thread onto the first element of the storage. FIFO
 *
 * @param {Object} thread
 * @returns void
 */
export const add = thread => {
  data.unshift({
    id: data.length + 1,
    ...thread,
  })
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
  getLatest,
  put,
  add,
  init,
}

export default storage
