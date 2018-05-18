# Currently Viewing App

Shows a list of IP addresses viewing the page

This project contains a React SPA that shows the list of Ip Address that
are also viewing the page.

All the requirements in the `instructions.md` file are compeleted.

* [x] **Shows the list of IP addresses currently viewing the app**
* [x] **When a new user opens the app, dynamically adds their IP address to the list of IPs**
* [x] **When a user closes the app, dynamically removes their IP address from the list of IPs**

## Starting the app locally

1.  Clone this repo.
2.  Run `yarn` or `npm install`.
3.  Run `yarn start` to start the app in development mode in the local environment

Currently this app only includes the frontend part of the project. A backend API will be soon added along with instructions to deploy and start the service locally as well as on other platforms.

Until then, the app looks kinda boring since it never updates as it is not live yet. So to test the app or to see a demo, it currently exposes a global called `fakeUpdater`.

It is a `RX Subject` that is used by our app as an `Observable` to consume updates. To simplify, `fakeUpdater` exposes a function `next` which can be used to issue fake updates.

Open the browser console after running `yarn start` and paste bellow code to see updates.

For adding an Ip:

```js
window.fakeUpdater.next({
  type: 'ADD,
  payload: {
    ip: '176.25.1.5',
    joined: new Date()
  }
})
```

For removing:

```js
window.fakeUpdater.next({
  type: 'REMOVE,
  payload: '176.25.1.5'
})
```

This updates will be ideally made by a GraphQL subscription that sends updates when a user opens the app and closes the app.
