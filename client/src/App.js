import React, { Component } from 'react'
import Websocket from 'react-websocket'
import { ToastContainer, toast } from 'react-toastify'

import config from './config'

import 'react-toastify/dist/ReactToastify.css'
import './App.css'

class App extends Component {
  /**
   * @params {object} props
   */
  constructor(props) {
    super(props)

    this.state = {
      addresses: [],
    }

    this.handleMessage = this.handleMessage.bind(this)
  }

  /**
   * @params {string} action
   */
  handleMessage(action) {
    const { type, payload } = JSON.parse(action)

    switch(type) {
      case 'CLIENT_JOIN':
        toast.success(
          this.renderNotification('Client Join', payload.meta.diff)
        )
        break

      case 'CLIENT_LEAVE':
        toast.error(
          this.renderNotification('Client Leave', payload.meta.diff)
        )
        break

      default:
        break
    }

    this.setState({
      addresses: payload.data
    })
  }

  /**
   * @param {string} title
   * @param {string} value
   * @return {React.Element}
   */
  renderNotification(title, value) {
    return (
      <div>
        <strong>{title}</strong>
        <p>
          {value}
        </p>
      </div>
    )
  }

  /**
   * return {React.Element}
   */
  render() {
    return (
      <div className="app">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">
              Active Client
            </h2>
            <hr />
          </div>

          <div className="card-content">
            <ul className="card-list">
              {
                this.state.addresses.map((address, key) => (
                  <li key={key} className="card-list-item">{address}</li>
                ))
              }
            </ul>
          </div>
        </div>

        <ToastContainer autoClose={3000} />
        <Websocket url={config.websocket_url} onMessage={this.handleMessage}/>
      </div>
    );
  }
}

export default App;
