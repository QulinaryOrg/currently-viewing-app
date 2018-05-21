import React, { Component } from 'react';
import List from './List';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ips: [],
        };
    }

    componentWillMount() {
        const wss = new WebSocket('ws://localhost:8000');

        wss.onopen = ev => {
            console.log(ev, 'event on open... ')
        }

        wss.onmessage = ({ data, error }) => {
            if (error) {
                // Handle error
                return;
            }
            const ips = JSON.parse(data).data;
            this.setState({
                connected: true,
                ips,
            });
        }
    }

    render() {
        const { connected, ips } = this.state;

        if (!connected) {
            console.log(connected);
            return (
                <div style={{ textAlign: 'center', color: '#888' }}>
                    Not connected
                </div>)
        }

        return (<div>
            <header className="navbar flex-column">Monitor</header>
            <div className="container">
                <div className="row"><List ips={ips} /></div>
            </div>
        </div>)
    }
}