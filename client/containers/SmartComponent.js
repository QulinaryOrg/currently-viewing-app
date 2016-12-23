import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getStarted, setIPList } from '../actions'
import DumbComponent from '../components/DumbComponent'

import { Event } from 'react-socket-io'

class SmartComponent extends Component {
  componentWillMount () {
    this.props.dispatch(getStarted())
  }

  onSocketMessage (message) {
    this.props.dispatch(setIPList(message))
  }

  render () {
    const connecteIPsList = this.props.ipList ? this.props.ipList.map(ip => (<div key={ip}>{ip}</div>)) : []

    return (
      <div>
        <Event event='connectedIPs' handler={message => this.onSocketMessage(message)} />
        <DumbComponent welcomeText={this.props.welcomeText} />
        <h5>Connected IPs:</h5>
        {connecteIPsList}
      </div>
    )
  }
}

export default connect(state => state)(SmartComponent)
