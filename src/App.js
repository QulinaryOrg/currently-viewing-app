import React, { Component } from 'react'
import styled from 'styled-components'

import About from './components/About'
import SubscribeUpdates from './components/SubscribeUpdates'
import IpTable from './components/IpTable'

const App = styled.main`
  max-width: 500px;
  margin: 20px auto;
  text-align: center;
`

export default class extends Component<{}> {
  render() {
    return (
      <App>
        <SubscribeUpdates>
          {ipDataList => (
            <div>
              <About totalIps={ipDataList.length} />
              <IpTable ipDataList={ipDataList} />
            </div>
          )}
        </SubscribeUpdates>
      </App>
    )
  }
}
