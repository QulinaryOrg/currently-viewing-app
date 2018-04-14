import React, { Component } from "react";
import Head from "next/head";
import * as firebase from "firebase";
import ipify from "ipify";
import CurrentlyViewing from "../components/CurrentlyViewing";

export default class extends React.Component {
  state = {};
  async componentDidMount() {
    // credentials hardcoded for demo. In production, api keys should be
    // placed in .env variables and injected during runtime
    var config = {
      apiKey: "AIzaSyAnutkEB8dWgh3sqWGZQZmf67rnrtu5ZKk",
      authDomain: "qulinary-currently-viewing.firebaseapp.com",
      databaseURL: "https://qulinary-currently-viewing.firebaseio.com",
      storageBucket: "qulinary-currently-viewing.appspot.com"
    };
    // initialize firebase.
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    // get firebase db instance
    const firedb = firebase.database();
    // get client's ip address using ipify api service
    const ip = await ipify();

    // rerender viewer list
    this.setState({ ip });

    // on change to viewers, re-render viewers list
    firedb.ref("viewers").on("value", snapshot => {
      const data = snapshot.val();
      const viewers = Object.keys(data).map(key => ({
        ip: data[key].ip,
        isViewer: data[key].ip === ip /* to identify this viewer */
      }));
      this.setState({ viewers });
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
    return (
      <div>
        <Head>
          <title>Qulinary - Currently Viewing</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <CurrentlyViewing viewers={this.state.viewers} />
      </div>
    );
  }
}
