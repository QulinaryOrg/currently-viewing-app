/* global describe it expect */
import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

function setup (lapses = []) {
  const actions = {
    ip_addresses: {}
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
})
