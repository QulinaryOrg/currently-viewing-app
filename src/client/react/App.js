import React from 'react';
// import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Intro from './Intro';
import IpList from './IpList';
import GithubLink from './GithubLink';

class App extends React.PureComponent {
  state = {
    ownIp: '127.0.0.1',
    ips: [],
  };

  componentDidMount() {
    const socket = io();

    // receive own ip once
    socket.on('own-ip', ip => {
      this.setState({
        ownIp: ip,
      });
    });

    // receive ips (and again each time ip list changes)
    socket.on('ips', ips => {
      this.setState({
        ips,
      });
    });
  }

  render() {
    const { ownIp, ips } = this.state;

    return (
      <div className="App">
        <Intro
          heading="Currently Viewing App"
          paragraph="Welcome to my solution for the Currently Viewing app, below you will
            see a list of IPs including your own. For this task, I used React,
            Redux, and Express!"
        />
        <IpList ownIp={ownIp} ips={ips} />
        <GithubLink url="https://github.com/standayweb/currently-viewing-app" />
      </div>
    );
  }
}

// App.propTypes = {
//   ownIp: PropTypes.string.isRequired,
//   ips: PropTypes.array.isRequired,
// };

export default App;
