# Angular Socket.IO IM Demo

+ Shows a list of IP addresses viewing the page
+ When a new user opens the app, dynamically adds their IP address to the list of IPs
+ When a user closes the app, dynamically removes their IP address from the list of IPs

## Running it

First, install the dependencies with npm:

    npm install

With these dependencies installed, you can run the skeleton app:

    node app.js

And navigate to `localhost:3000`


## More important files
+ /routes/socket.js --> export function for listening to the socket
+ /public/js/controllers.js --> application controllers
+ /public/js/services.js --> custom angular services
+ /views/index.jade   --> main page for app

## References
+ https://github.com/QulinaryOrg/currently-viewing-app (what to do)
+ https://github.com/btford/angular-socket-io-seed (boiler-plate)