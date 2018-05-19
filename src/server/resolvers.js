import ipDataStore from './ipDataStore'

export const updateChannel = 'IP_UPDATES_CHANNEL'

export default {
  Query: {
    allIpData: () => ipDataStore.allIpData,
  },

  Subscription: {
    ipDataUpdate: {
      subscribe: (parent: any, args: any, { pubsub }: any) =>
        pubsub.asyncIterator(updateChannel),
    },
  },
}
