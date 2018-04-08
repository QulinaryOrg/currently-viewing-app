import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import ReactCountryFlag from 'react-country-flag'
import './App.css'

export class App extends Component {
  componentDidMount () {
    axios
      .get('//ipinfo.io')
      .then(response =>
        this.props.firebase.push('/ip_addresses', response.data)
      )
      .then(result => {
        this.props.userVisit(result)
        this.props.firebase
          .database()
          .ref(`ip_addresses/${result.key}`)
          .onDisconnect()
          .remove()
      })
  }

  render () {
    let content = <span>Loading...</span>
    if (isLoaded(this.props.ip_addresses)) {
      content = (
        <table className='table table-inverse'>
          <thead>
            <tr>
              <th>IP</th>
              <th>City</th>
              <th>Country</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.ip_addresses).map(key => (
              <tr
                key={key}
                className={
                  this.props.current_user &&
                  this.props.current_user.key === key &&
                  'active'
                }
              >
                <td>{this.props.ip_addresses[key]['ip']}</td>
                <td>{this.props.ip_addresses[key]['city']}</td>
                <td>{this.props.ip_addresses[key]['country']}</td>
                <td>
                  {
                    <ReactCountryFlag
                      svg
                      code={this.props.ip_addresses[key]['country']}
                    />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
    return <div className='jumbotron'>{content}</div>
  }
}

App.propTypes = {
  ip_addresses: PropTypes.object
}

export default compose(
  firebaseConnect(['ip_addresses']),
  connect(
    ({ firebase, main: { current_user } }) => ({
      ip_addresses: firebase.data.ip_addresses,
      current_user
    }),
    dispatch => ({
      userVisit: user => dispatch({ type: 'USER_VISIT', result: user })
    })
  )
)(App)
