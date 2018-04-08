import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded } from 'react-redux-firebase'
import ReactCountryFlag from 'react-country-flag'
import AddIP from '../containers/AddIP'

export const App = ({ipAddresses, currentUser}) => {
  let content = <span>Loading...</span>
  if (isLoaded(ipAddresses)) {
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
          {Object.keys(ipAddresses).map(key => (
            <tr
              key={key}
              className={
                currentUser && currentUser.key === key &&
                'active'
              }
            >
              <td>{ipAddresses[key]['ip']}</td>
              <td>{ipAddresses[key]['city']}</td>
              <td>{ipAddresses[key]['country_name']}</td>
              <td>
                {
                  <ReactCountryFlag
                    svg
                    code={ipAddresses[key]['country']}
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

App.propTypes = {
  currentUser: PropTypes.object,
  ipAddresses: PropTypes.object
}

export default compose(
  firebaseConnect(['ipAddresses']),
  connect(
    ({ firebase, main: { currentUser } }) => ({
      ipAddresses: firebase.data.ipAddresses,
      currentUser
    })
  ),
  AddIP
)(App)
