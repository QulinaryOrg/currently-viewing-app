import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ipsReceived } from '../redux/ips/actions';
import { ownIpReceived } from '../redux/own-ip/actions';
import io from 'socket.io-client';
import Intro from './Intro';
import IpList from './IpList';
import GithubLink from './GithubLink';

class App extends React.PureComponent {
  componentDidMount() {
    const socket = io();

    // receive own ip once
    socket.on('own-ip', ip => {
      this.props.ownIpReceived(ip);
    });

    // receive ips (and again each time ip list changes)
    socket.on('ips', ips => {
      this.props.ipsReceived(ips);
    });
  }

  render() {
    const { ownIp, ips } = this.props;

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
  ipsReceived: PropTypes.func.isRequired,
  ownIpReceived: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ownIp: state.ownIp,
  ips: state.ips,
});

const mapDispatchToProps = { ipsReceived, ownIpReceived };

export { App };
export default connect(mapStateToProps, mapDispatchToProps)(App);
