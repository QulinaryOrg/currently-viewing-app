import React, { Component } from "react";
import Head from "next/head";
import * as firebase from "firebase";
import ip from "ip"; /* IP util for node */
import CurrentlyViewing from "../components/CurrentlyViewing";

/* credentials hardcoded for demo, with no auth for public read/write.
 In production, api keys should be placed in .env variables and injected during runtime.
*/
const firebaseConfig = {
  apiKey: "AIzaSyAnutkEB8dWgh3sqWGZQZmf67rnrtu5ZKk",
  authDomain: "qulinary-currently-viewing.firebaseapp.com",
  databaseURL: "https://qulinary-currently-viewing.firebaseio.com",
  storageBucket: "qulinary-currently-viewing.appspot.com"
};

export default class extends React.Component {
  state = {};
  /* https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle */
  /* access server-side for node functionality and req object to resolve IP address */
  static async getInitialProps({ req }) {
    return {
      ip:
        /* https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For */
        (req.headers["x-forwarded-for"] || "")
          .split(",") /* multiple entries possible, proxies */
          .shift() /* origin remote IP address */ ||
        ip.address("public") /* localhost IP address  */
    };
  }
  async componentDidMount() {
    // initialize firebase once
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    // get firebase db instance
    const firedb = firebase.database();
    const { ip } = this.props;

    // rerender viewer list
    this.setState({ viewers: [{ ip, isViewer: true }], isLoading: true });

    // on change to viewers, re-render viewers list
    firedb.ref("viewers").on("value", snapshot => {
      const data = snapshot.val();
      const viewers = Object.keys(data).map(key => ({
        ip: data[key].ip,
        isViewer: data[key].ip === ip /* to identify this viewer */
      }));
      this.setState({ viewers, isLoading: false });
    });
    // firebase doesn't allow "." as a key, use hyphen instead
    const urlFriendlyKey = ip.split(".").join("-");
    // get ref to this viewer
    const thisViewerRef = firedb.ref(`viewers/${urlFriendlyKey}`);
    /* update this viewer's IP to firebase */
    thisViewerRef.set({ ip });
    /* on disconnect, remove from firebase */
    thisViewerRef.onDisconnect().remove();
  }
  render() {
    const { isLoading, viewers } = this.state;
    return (
      <div>
        <Head>
          <title>Qulinary - Currently Viewing</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <CurrentlyViewing viewers={viewers} isLoading={isLoading} />
      </div>
    );
  }
}
