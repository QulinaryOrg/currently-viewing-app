/** @type {array} **/
const collection = []


/**
 * @return {array}
 */
function get() {
  return collection
}

/**
 * @param {string} item
 * @return {boolean}
 */
function has(item) {
  return collection.indexOf(item) >= 0
}

/**
 * @param {string} item
 */
function append(item) {
  if (!has(item)) {
    collection.push(item)
  }
}

/**
 * @param {string} item
 */
function remove(item) {
  const index = collection.indexOf(item)

  if (index >= 0) {
    collection.splice(index, 1)
  }
}

/**
 * @return {string}
 */
function toString() {
  return JSON.stringify(collection)
}


module.exports = {
  get,
  has,
  append,
  remove,
  toString,
}
