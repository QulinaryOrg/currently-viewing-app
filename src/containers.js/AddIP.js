import React, { Component } from 'react'
import axios from 'axios'

const AddIP = WrappedComponent => {
  class IPConnect extends Component {
    componentDidMount () {
      const { firebase, dispatch } = this.props
      axios
          .get('https://ipapi.co/json/')
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

export default AddIP
