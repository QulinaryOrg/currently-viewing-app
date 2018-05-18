import React from 'react'
import styled from 'styled-components'

import type { IpData } from '../types'

const Table = styled.table`
  th,
  thead,
  td {
    text-align: center;
  }
`

const IpRow = ({ ip, joined }: IpData) => (
  <tr>
    <td>{ip}</td>
    <td>{joined.toLocaleString()}</td>
  </tr>
)

export default ({ ipDataList }: { ipDataList: IpData[] }) =>
  ipDataList.length === 0 ? null : (
    <Table>
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Join Time</th>
        </tr>
      </thead>

      <tbody>
        {ipDataList.map(ipData => <IpRow key={ipData.ip} {...ipData} />)}
      </tbody>
    </Table>
  )
