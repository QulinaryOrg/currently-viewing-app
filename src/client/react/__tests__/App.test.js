import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <App
      ownIp="127.0.0.1"
      ips={['127.0.0.1', '206.189.115.20']}
      ipsReceived={() => {}}
      ownIpReceived={() => {}}
    />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
