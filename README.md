# Currently Viewing App

Shows a list of IP addresses viewing the page

# Description
There are two parts of this app.
1. Server: An ExpressJS app to store and serve IPs of connected clients. 
2. Client: An Angular5 app which displays IPS by getting those from server to the servers.

Both Server and Client are using Socket.io for communication.

## Setup
==> Docker based setup
1. Instal Docker
1. Clone this repo
3. Run `docker-compose up`.
4. Go to browser and type `0.0.0.0:8080`

==> If you do not have Docker then follow below steps.
1. Install MongoDB
2. Install Node.js@8.11.1 and npm
3. go to server folder  `cd server`
4. type `npm install`
5. type `npm start`
6. go to browser and type `127.0.0.1:8080`