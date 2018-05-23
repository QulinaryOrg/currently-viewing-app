import React, { Component } from 'react';
import List from './List';
import config from '../config';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ips: {},
            connected: false
        };
    }

    componentWillMount() {
        const wss = new WebSocket(config.socket_address);

        wss.onopen = ev => {
            this.setState({ connected: true })
        }

        wss.onmessage = ({ data, error }) => {
            if (error) {
                // Handle error
                return;
            }
            const ips = JSON.parse(data).data;
            this.setState({ ips });
        }
    }

    render() {
        const { connected, ips } = this.state;

        if (!connected) {
            return (
                <div style={{ textAlign: 'center', color: '#888' }}>
                    Not connected
                </div>)
        }

        return (<div>
            <header className="navbar bd-navbar flex-column"><span className="h2">Monitor</span></header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <List ips={ips} />
                    </div>
                </div>
            </div>
        </div>)
    }
}