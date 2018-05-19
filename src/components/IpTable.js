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

const IpRow = ({ ip, countryName }: IpData) => (
  <tr>
    <td>{ip}</td>
    <td>{countryName || '-'}</td>
  </tr>
)

export default ({ ipDataList }: { ipDataList: IpData[] }) =>
  ipDataList.length === 0 ? null : (
    <Table>
      <thead>
        <tr>
          <th>IP Address</th>
          <th>Country</th>
        </tr>
      </thead>

      <tbody>
        {ipDataList.map(ipData => <IpRow key={ipData.ip} {...ipData} />)}
      </tbody>
    </Table>
  )
