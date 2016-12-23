// Define an action type, it's used for reducer switching
export const GET_STARTED = 'GET_STARTED'
export const SET_IP_LIST = 'SET_IP_LIST'

// Define the corresponding action creator, must return an object
export function getStarted () {
  return {
    type: GET_STARTED
  }
}

export function setIPList (ipList) {
  return {
    type: SET_IP_LIST,
    payload: ipList
  }
}
