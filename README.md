##### Attention! Currently there is a small bug in app, please visit 
	$ http://127.0.0.1:3000/#/
	instead of 
	$ http://127.0.0.1:3000

	Will fix it tomorrow

# Currently Viewing App

Shows a list of IP addresses viewing the page.

## Concept
I have developed this application with MEAN stack. IP updates are push to clients through websockets. Socket.io library is selected based on the following stackoverflow analysis http://stackoverflow.com/questions/16392260/which-websocket-library-to-use-with-node-js . User has to register and login in order to see the list of online ips. Registeration is a simple process of adding only username and password. Information is saved permanently to Mongo DB. Instead of memory based sessions, I am saving sessions in MongoDB inorder to use them for websockets too. Passport and passport.socketio libs are used to implement authorization for both Restful Api and websockets.

Frontend directory structure and authorization mechanism is mostly based on the following concept http://stackoverflow.com/a/29797145/818731


## Development Environment

At the bare minimum you'll need the following for your development environment:

1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. [Nodejs](https://docs.npmjs.com/getting-started/installing-node)
3. [MongoDB](https://www.mongodb.com/download-center?jmp=homepage#community)

### Local Setup

The following assumes you have all of the recommended tools listed above installed.

#### 1. Clone the project:

    $ git clone git@github.com/syedwaseemjan/currently-viewing-app.git
    $ cd currently-viewing-app

#### 2. Install dependencies:

    $ npm install

#### 3. Run tests:

    $ Not added yet, will do tomorrow :)
    $ npm install -g mocha
    $ npm test

#### 4. Run the server:

    $ sudo npm start

#### 5. Load the system in browser:

    Visit http://127.0.0.1:5000


### References:
https://github.com/QulinaryOrg/currently-viewing-app
http://stackoverflow.com/questions/16392260/which-websocket-library-to-use-with-node-js
http://stackoverflow.com/a/29797145/818731
https://github.com/jfromaniello/passport.socketio




