## IP list test

### description
This is a very small project, to display the IP's of the currently visiting users. 

The project is split into two parts Application(react frontend client) and Server(nodeJS server)
below you can find how to start each. 

As i have made the app before answers come back, i have decided as following: 
- the App (React part) is made in JS 
- the Server is made in Typescript (because i love typescript)
- The communication is made through socketIO 
- I dropped Express as its not necessary for the server
- I have made it simple and clean
- I count every connection as a "new user" even if its from the same IP
- I am not a designer, but an engineer therefore the UI is simple as well

Things i would have done during my dayjob, but didn't do in this test: 
- Unit tests, but added the possibility. 
- JSDoc comments, as the test is very simple, i beleive that my code is self-explanatory
- Configs for the server
- Less/Scss

## SERVER
    cd server

### Install 
    npm install

### compile 
    npm run compile

### Run 
    npm run start

### Test
    npm run test

####--------------

## APPLICATION
    cd app

### Install 
    npm install

### Run 
    npm run start

### Build 
    npm run build

### Run tests
    npm run test