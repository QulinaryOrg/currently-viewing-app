import React, { Component } from "react";
import Head from "next/head";
import ipify from "ipify";
import CurrentlyViewing from "../components/CurrentlyViewing";

export default class extends React.Component {
  static async getInitialProps() {
    const ip = await ipify();
    return {
      viewers: [
        {
          ip
        }
      ]
    };
  }
  render() {
    console.log("viewers:", this.props.viewers);

    return (
      <div>
        <Head>
          <title>Qulinary - Currently Viewing</title>
        </Head>
        <CurrentlyViewing viewers={this.props.viewers} />
      </div>
    );
  }
}
