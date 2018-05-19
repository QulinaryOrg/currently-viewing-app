/**
 *
 * This component does not include any UI. Its main focus is to manage the state
 * of ipData. It uses Render Props to share the state.
 *
 */

import React from 'react'
import gql from 'graphql-tag'

import client from '../utils/graphqlClient'
import type { IpData } from '../types'
import { updater } from '../utils/updater'
import { appendToList, removeFromList } from '../utils/ipDataList'

type Props = {
  children: Function,
}

type State = {
  ipDataList: IpData[],
}

const getInitialState = async () => {
  return client
    .query({
      query: gql`
        {
          allIpData {
            ip
            countryName
          }
        }
      `,
    })
    .then(({ data }) => (data && data.allIpData) || [])
}

class SubscribeUpdates extends React.Component<Props, State> {
  subscription = {}
  state = {
    ipDataList: [],
  }

  async componentDidMount() {
    const initialData = await getInitialState()

    this.setState({
      ipDataList: initialData,
    })

    this.subscription = updater.subscribe({
      next: action => {
        if (action.type === 'ADD') {
          this.setState(state => ({
            ipDataList: appendToList(state.ipDataList, action.payload),
          }))
          return
        }

        if (action.type === 'REMOVE') {
          this.setState(state => ({
            ipDataList: removeFromList(state.ipDataList, action.payload.ip),
          }))
        }
      },
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
