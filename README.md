# Currently Viewing App

Shows a list of IP addresses viewing the page

## Requirements

To run this application in your local development environment ensure that your system meets the following requirements:

1. Ensure you have internet with a good speed. The whole process and application will not work without internet.

2. You have installed the latest version of node in your system. If you have not kindly download and install it from here : https://nodejs.org/en/

3. You have installed git in your system. Install from here https://git-scm.com/downloads if you have not.



## Getting Started

- Clone the repository by issuing this command in your terminal: git clone https://github.com/bytenaija/currently-viewing-app.git

Still in your terminal run the following commands:
- cd currently-viewing-app

### To start the server 
- cd server
- npm install
- Ensure that port 3000 is not being used by another program. If it is not available open the config.js file in the config directory and change the port variable currently set to 3000 to an available port number.
- npm run dev


### To start the client
Open another terminal and enter the following commands
- cd client
- npm install
- If you changed the port on the server, ensure that you change the port on line 15 in main.js to the port you set on the server so that the socket can connect.
- npm run dev
- Open as many browser or browser tabs as you need to test and navigate to http://localhost:8080 and see all the list of IPs of those connected browsers. Note that the IP adresses may be the same since you are actually using one IP for each of the browser.


### Note
- This application uses MongoDB and it is hosted as a sandbox by mlab.com for testing purposes;
- Uses http://freegeoip.net to ascertain the users IP address and other information.


Enjoy your testing!