import { GraphQLServer, PubSub } from 'graphql-yoga'

import store from './ipDataStore'
import getIpLocation from '../utils/getIpLocation'
import resolvers, { updateChannel } from './resolvers'
import { appendToList, removeFromList } from '../utils/ipDataList'

const pubsub = new PubSub()
const delay = ms => new Promise(res => setTimeout(res, ms))

const server = new GraphQLServer({
  typeDefs: require.resolve('./schema.graphql'),
  resolvers,
  context: { pubsub },
})

const getIpFromWs = ws => {
  const req = ws.upgradeReq
  const socket = ws._socket

  if (req && req.headers && req.headers['x-forwarded-for']) {
    return req.headers['x-forwarded-for']
  }
  if (req && req.connection && req.connection.remoteAddress) {
    return req.connection.remoteAddress
  }
  return socket.remoteAddress
}

const publishIpData = async (type, ip) => {
  const { countryName } = await getIpLocation(ip)

  await delay(1000)

  store.allIpData =
    type === 'ADD'
      ? appendToList(store.allIpData, {
          ip,
          countryName,
        })
      : removeFromList(store.allIpData, ip)

  pubsub.publish(updateChannel, {
    ipDataUpdate: {
      type,
      payload: {
        ip,
        countryName,
      },
    },
  })
}

server.start(
  {
    subscriptions: {
      async onConnect(_, ws) {
        const ip = getIpFromWs(ws)
        console.log('connect', ip)
        publishIpData('ADD', ip)
      },
      onDisconnect(ws) {
        const ip = getIpFromWs(ws)
        console.log('disconnect', ip)
        publishIpData('REMOVE', ip)
      },
    },
  },
  () =>
    console.log(`Server is running on localhost:${process.env.PORT || 4000}`)
)
