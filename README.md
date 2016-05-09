# Currently Viewing App

Shows a list of IP addresses viewing the page

## Demonstration
	http://currently-viewing-app.herokuapp.com

## Requirements

A single-page web app that:

1. **Shows the list of IP addresses currently viewing the app**
2. **When a new user opens the app, dynamically adds their IP address to the list of IPs**
3. **When a user closes the app, dynamically removes their IP address from the list of IPs**


## Installation Instructions

1. Clone this repository:
	`$ git clone https://github.com/Arania/currently-viewing-app.git`
2. Make sure [NodeJS](http://www.nodejs.org) and [NPM](http://www.npmjs.com) are installed on your system
3. Change to application directory:
	`$ cd currently-viewing-app`
4. Install required packages:
	`$ npm install`

## Running the Application:
	1. `$ npm start`
	2. The application can be accessed on http://YOUR-MACHINE-IP:3000
	3. (Optionally) To change the default port, run the following -
	 		`$ set PORT=4000`
			`$ npm start`
			The application will then be available on http://YOUR-MACHINE-IP:4000
