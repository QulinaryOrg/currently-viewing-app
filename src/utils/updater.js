/**
 *
 * This file exports the updaters that updates us when either an IP is added
 * or removed. These updaters are RX Observables. Observables are used to
 * abstract away the implementation of how the updates are consumed.
 *
 */

import { Observable, Subject } from 'rxjs'

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

// TODO: Create a real updater that updates the observer on new actions.
export const updater = Observable.create(observer => {})
