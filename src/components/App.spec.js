/* global describe it expect */
import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

function setup (ipAddresses, currentUser) {
  const actions = {
    ipAddresses,
    currentUser
  }
  const component = shallow(
    <App {...actions} />
  )

  return {
    div: component.find('.jumbotron')
  }
}

describe('App component', () => {
  it('should display without crashing', () => {
    const { div } = setup()
    expect(div.length).toEqual(1)
  })
  it('should only display loading text when IP addresses has not loaded', () => {
    const { div } = setup()
    expect(div.contains(<span>Loading...</span>)).toEqual(true)
    expect(div.find('table tbody tr').length).toEqual(0)
  })
  it('should only display list of IP addresses when IP addresses has loaded', () => {
    const ipAddresses = {'qwerty123': {key: 'qwerty123', city: 'Lagos', country: 'NG', country_name: 'Nigeria', ip: '124.11.112.10'}, '123dasarrr': {key: 'qwerty123', city: 'Lagos', country: 'NG', country_name: 'Nigeria', ip: '124.11.112.10'}}
    const { div } = setup(ipAddresses)
    expect(div.find('table tbody tr').length).toEqual(2)
    expect(div.contains(<span>Loading...</span>)).toEqual(false)
  })
  it('should display a row with class active to indicate current user IP when loaded', () => {
    const ipAddresses = {'qwerty123': {key: 'qwerty123', city: 'Lagos', country: 'NG', country_name: 'Nigeria', ip: '124.11.112.10'}, '123dasarrr': {key: 'qwerty123', city: 'Lagos', country: 'NG', country_name: 'Nigeria', ip: '124.11.112.10'}}
    const currentUser = {key: 'qwerty123', city: 'Lagos', country: 'NG', country_name: 'Nigeria', ip: '124.11.112.10'}
    const { div } = setup(ipAddresses, currentUser)
    expect(div.find('table tbody tr.active').length).toEqual(1)
    expect(div.find('table tbody tr').length).toEqual(2)
  })
})
