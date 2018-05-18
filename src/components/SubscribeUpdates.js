/**
 *
 * This component does not include any UI. Its main focus is to manage the state
 * of ipData. It uses Render Props to share the state.
 *
 */

import React from 'react'

import type { IpData } from '../types'
import { fakeUpdater as updater } from '../utils/updater'
import { appendToList, removeFromList } from '../utils/ipDataList'

type Props = {
  children: Function,
}

type State = {
  ipDataList: IpData[],
}

class SubscribeUpdates extends React.Component<Props, State> {
  subscription = {}
  state = {
    ipDataList: [],
  }

  componentDidMount() {
    this.subscription = updater.subscribe(action => {
      console.log(action)
      if (action.type === 'ADD') {
        this.setState(state => ({
          ipDataList: appendToList(state.ipDataList, action.payload),
        }))
        return
      }

      if (action.type === 'REMOVE') {
        this.setState(state => ({
          ipDataList: removeFromList(state.ipDataList, action.payload),
        }))
        return
      }
    })
  }

  componentWillUnmount() {
    this.subscription.unsubscribe()
  }

  render() {
    return this.props.children(this.state.ipDataList)
  }
}

export default SubscribeUpdates
