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
3.  Run `yarn now-start` to start the Graphql service
4.  Run `yarn start` to start the app in development mode in the local environment

This app includes both the frontend and backend code. frontend is built using React/Apollo and backend is built using Graphql. Real time updates are sent over graphql subscriptions.

To check the live version of the app, visit https://currently-viewing.surge.sh/ and to interact with the graphql api and see the backend docs, visit https://currently-viewing.now.sh/
