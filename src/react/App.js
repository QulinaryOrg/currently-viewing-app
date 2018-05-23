import React from 'react';
import PropTypes from 'prop-types';
import Intro from './Intro';
import IpList from './IpList';
import GithubLink from './GithubLink';

class App extends React.PureComponent {
  render() {
    const ownIp = '127.0.0.1';
    const ips = [
      '236.189.115.20',
      '127.0.0.1',
      '206.189.115.20',
      '276.189.115.20',
    ];

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

App.propTypes = {
  ownIp: PropTypes.string.isRequired,
  ips: PropTypes.array.isRequired,
};

export default App;
