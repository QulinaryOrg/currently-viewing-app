import styles from "./index.scss";
import React from "react";
import Firebase from "../config";
import axios from "axios";
import {map, reduce} from "ramda";
import {toArray} from "lodash";

const presenceRef = Firebase.database();
const userPresence = presenceRef.ref("users");
const connectedRef = Firebase.database().ref(".info/connected");
let currentUserInfoStore;
connectedRef.on("value", async (snap) => {
	if (snap.val() === true) {
		try {
			currentUserInfoStore = [];
			const userData = await axios.get("//ipinfo.io");
			currentUserInfoStore.push(userData.data);
			const conn = userPresence.push(userData.data);
			conn.onDisconnect().remove();
		} catch(err) {
			console.trace("Error Getting Your Information");
		}
	}
});

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let self = this;
		userPresence.on("value", (value) => {
			let visits = value.val();
			if(visits) {
				let retrieveList = map(visit => visit, visits);
				let arraytifyList = toArray(retrieveList);
				typeof domStateRender !== undefined ? domStateRender && domStateRender(arraytifyList) : null;
			}
		}, (err) => {
			console.log(err);
		});

		let domStateRender = (value)  => {
			if(value && value.length > 0) {
				setTimeout(() => {
					self.setState({user: value});
				}, 1000);
			}
		};

		const {user} = this.state;
		return (
			<div>
			<div className="container">
			<br />
			<div className="row">
				<div className="dual-list list-left col-md-5">
					<div className="well text-right">
						<div className="row">
							<div className="col-md-12">
								<h4>Your Details</h4>
							</div>
						</div>
						<ul className="list-group">
						{currentUserInfoStore && currentUserInfoStore.length > 0 ? currentUserInfoStore.map((value, index) =>
							(<li className="list-group-item" key={index}>
								<p>Country: {value.country}</p>
								<p>City: {value.city}</p>
								<p>ip: {value.ip}</p>
								<p>loc: {value.loc}</p>
							</li>)) :
							<li className="list-group-item">Fetching your info .... </li>}
						</ul>
					</div>
				</div>
				<div className="dual-list list-right col-md-5">
					<div className="well">
						<div className="row">
							<div className="col-md-12">
								<h4>Visitor IP Adresses. <small>Including yours though.</small></h4>
							</div>
						</div>
						<ul className="list-group">
						{user ? user.map((value,index) => (
							<li className="list-group-item" key={index}>{value.ip}</li>)) :
							<li className="list-group-item">Loading ..... </li>}
						</ul>
						<p>Currently viewing: {user && user.length > 0 ? user.length : 0}</p>
					</div>
				</div>
			</div>
		</div>
		</div>
		)
	}
}
