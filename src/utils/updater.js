/**
 *
 * This file exports the updaters that updates us when either an IP is added
 * or removed. These updaters are RX Observables. Observables are used to
 * abstract away the implementation of how the updates are consumed.
 *
 */

import { Subject } from 'rxjs'
import gql from 'graphql-tag'

import client from '../utils/graphqlClient'

// This fake updater just sends ADD actions to the observer.
// Its is used for testing an demo purpose.
// Because we have abstracted how we get the updates, this updater can
// easily be swapped with a real updater which could be a GraphQL subscription,
// a websocket connection or even a polling implementation.
export const fakeUpdater = new Subject()

// While in development mode, we are adding the fakeUpdater to globals.
// This allows us to manually add updates from console.
if (process.env.NODE_ENV === 'development') {
  window.fakeUpdater = fakeUpdater
}

export const updater = client
  .subscribe({
    query: gql`
      subscription {
        ipDataUpdate {
          type
          payload {
            ip
            countryName
          }
        }
      }
    `,
  })
  .map(({ data }) => data.ipDataUpdate)
