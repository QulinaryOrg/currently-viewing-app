# Currently Viewing App

Shows a list of IP addresses viewing the page

## Requirements
- NodeJs 5.0.0 or later. 
- npm 3.0.0 or later

## Installation 
- git clone git@github.com:sgmarghade/currently-viewing-app.git
- cd currently-viewing-app
- npm install
- node index.js
- open browser and type : http://localhost:35010
- open another machine and type : http://<host_machine_ip>:35010

## Technology used 
- NodeJs for backend
- Hapi.js as NodeJs framework
- socket.io to manage socket. 
- Angular js for frontend. 

## Scale 
- This demo app uses inmemory Database to server and manage ip addresses. 
- With adapter pattern we can use different implementation. 
- Sinlge app will not work at scale and solution required for horizontal scalling. 
- We can use service discovery and inform all servers to inform connected clients about new data. 
- Pagination will be must when data goes beyong some numbers. 

Happy coding!


