import React from 'react';
import ReactDOM from 'react-dom';
import IpList from '../IpList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <IpList ownIp="127.0.0.1" ips={['127.0.0.1', '206.189.115.20']} />,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
