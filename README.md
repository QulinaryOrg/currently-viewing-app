# Currently Viewing App

Shows a list of IP addresses viewing the page

What this app does is:

1. **Shows the list of IP addresses currently viewing the app**
2. **When a new user opens the app, dynamically adds their IP address to the list of IPs**
3. **When a user closes the app, dynamically removes their IP address from the list of IPs**

## Guidelines

How to run project:

```
  git clone git@github.com:jihdeh/currently-viewing-app.git
  npm install or yarn add
  npm start
  then visit (http://localhost:8888)
```

To see it work with other visitors, you can the run app on *[ngrok](http://ngrok.io)*, and share the url with others.

Tech Stack:

- ReactJS (frontend library)
- Firebase (For serverless socket connections)
- ES6 himself

IP Helper

- http://ipinfo.io (gets visitors ip address)

Happy testing!


