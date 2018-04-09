import React, { Component } from 'react'
import axios from 'axios'

/**
 * @name addIP
 * @description Function that creates a Higher Order Component that
 * automatically gets a visitors IP and add to the list of users viewing a page IP list
 * it also manages removal of the visitors IP once he leaves the app. It does this with the help of
 * React's Lifecycle hooks.

 * @param {Object} WrappedComponent - A component that will be wrapped with this functionality
 * @return {Function} - HOC that is wrapped with this functionality

 */

const addIP = WrappedComponent => {
  class IPConnect extends Component {
    componentDidMount () {
      const { firebase, dispatch } = this.props
      axios
          .get(process.env.REACT_APP_GET_IP_URL)
          .then(response =>
            firebase.push('/ipAddresses', response.data)
          )
          .then(result => {
            dispatch({ type: 'USER_VISIT', result })
            firebase
              .database()
              .ref(`ipAddresses/${result.key}`)
              .onDisconnect()
              .remove()
          })
    }
    render () {
      return (
        <WrappedComponent
          {...this.props}
          {...this.state}
        />
      )
    }
  }

  return IPConnect
}

export default addIP
