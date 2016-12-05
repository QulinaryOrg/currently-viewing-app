# How to run

## Setup Server App
1. `npm install`
2. npm start
    
## Setup Proxy Server or Host
1. `npm install ngrok -g`
2. `ngrok http 3000`
3. check the terminal and get the http forwarding address
4. cd into /client/src directory edit config.ts and change the host to the forwarding address
    
## Setup Client App    
1. cd into /client
2. `npm install`
3. `npm install -g angular-cli`
4. `ng serve`
5. visit the web in http://localhost:4200
6. or browse the website from any device using `ngrok http 4200` and browse the website in the forwarding address 


# Currently Viewing App

Shows a list of IP addresses viewing the page

## Requirements

Create a single-page web app that:

1. **Shows the list of IP addresses currently viewing the app**
2. **When a new user opens the app, dynamically adds their IP address to the list of IPs**
3. **When a user closes the app, dynamically removes their IP address from the list of IPs**

## Guidelines

- You MUST include installation instructions so that it can be run locally be other developers.
- You MUST publish your solution as a public github repository.
- You MUST include, at a minimum, a javascript component on the client-side portion of the application; the rest of the solution is up to you.
- You SHOULD make extensive use of any tools/frameworks/libraries/APIs you feel aid in completion of the tree requirements
- You SHOULD follow best practices for the languages or tools that you select.
- You SHOULD take as little or as long as you need (but don't overdo it). You will not be evaluated on time to complete.
- You SHOULD ask questions if anything specified here is not clear in any way.

## Instructions

1. Fork this github repository using your personal github account
2. Create your solution. Test it. Test it again to be sure. Commit it and push to your personal repo.
3. Submit a PR (pull request) back to this repository indicating your solution is ready for review

## Evaluation Criteria

You will be evaluated with the following in mind:

- Does the solution satisfy the three requirements?
- Does the solution run locally based on the provided instructions?
- Does the solution make good use of tools/frameworks/libraries/APIs?
- Does the implementation follow established best practices (design patterns, language usage, code formatting, etc..)?
- Does the implementation use a sound design? What is the efficiency of the design? What happens at scale?
- Does the solution go above/beyond from a visual/UI perspective? Is it nice to look at or does it make the eyes bleed?

Happy coding!


