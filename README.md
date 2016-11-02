# Currently Viewing App

## Installation

**Dependencies**

- git [How to Install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- node [How to Install](https://docs.npmjs.com/getting-started/installing-node)

Clone this repository:

```bash
git clone git@github.com:mjbrisebois/currently-viewing-app.git
cd currently-viewing-app
```

Install package dependencies:

```bash
npm install
```

## Starting the Server

To run on port 80 it must be run with sudo.  If you do not have sudo privileges you can change the
port in the `server.js` by updating the line `server.port = 80`.

```bash
sudo npm start
```
or 
```bash
sudo node server.js
```

## Running Tests

**Install mocha globally**

```bash
npm install -g mocha
```

API unit tests can be run with:

```bash
npm test
```
or 
```bash
mocha tests/test.js
```

Also included is a `bot-viewers.js` script that generates random connections and closes them at a
random set timeout (max 20 seconds).

```bash
node tests/bot-viewers.js
```
