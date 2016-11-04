import Firebase from "firebase";
//PS: EXPOSING KEYS JUST FOR DEMO.
//SHOULD BE SET AS AN ENVIRONMENT VARIABLE
var config = {
  apiKey: "AIzaSyAvR1_S-5AIkdsUWCcP1XN5NxSl-LRtBfs",
  authDomain: "umbrella77-3bf3e.firebaseapp.com",
  databaseURL: "https://umbrella77-3bf3e.firebaseio.com"
};
Firebase.initializeApp(config);

export default Firebase;
