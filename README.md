# Currently Viewing
Currently Viewing is a simple app that allows users to see who is currently viewing the application by displaying a list of connected users by their IP address.

# Tech Stack
Node

Express

WebSockets (Socket.io)

AngularJS

Twitter Bootstrap

HTML/CSS

# Setup
You must have Node installed to run this app.

1. Clone this repository onto your computer.
2. Run npm install to grab all necessary dependencies.
3. Run npm start to start the server.
4. Navigate to localhost:8080 to view the application.

# No Database
For simplicity, there is no database layer in this application. Instead, users are kept on a simple collection on the server memory. At scale, it would be advisable to handle storing users with a database.

# Features

1. Displays a list of users currently viewing the application by their IPv6 Address.
2. Updates the list in real-time when a new user joins by opening the app.
3. Updates the list in real-time when a user leaves by closing the app.
4. A single user opening the application multiple times (multiple instances of same IP) will not affect the list by adding duplicates, and only closing the first instance of the application will successfully remove them from the list.
