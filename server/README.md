# Server

This is the  backend api for visitor "Currently Viewing App". It is build in Nodejs and ES6 with mlab

## Installation and setup
Clone the project  repository from github

```
cd server
npm install
npm start
```

The application will start running on port `8080`
Your computer should have NodeJS LTS > 6 installed.


## Configuration
To configure the application, find the following files and change necessary post and database information
```
config/config.js
.env

```

## Development server

Run `npm start` for a dev server.

or run `node server.js` for live deployment

## Testing
To test the application run the following command
```
npm test
```

## Available api lists
```
GET - http://localhost:8080
POST - http://localhost:8080/visitors
GET - http://localhost:8080/visitors
GET - http://localhost:8080/visitors?time=20
DELETE - http://localhost:8080/visitors/{ip}
```

