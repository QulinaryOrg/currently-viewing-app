import React, { Component } from 'react'
import axios from 'axios'

const AddIP = WrappedComponent => {
  class IPConnect extends Component {
    componentDidMount () {
      const { firebase, dispatch } = this.props
      axios
          .get('//ipinfo.io')
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
