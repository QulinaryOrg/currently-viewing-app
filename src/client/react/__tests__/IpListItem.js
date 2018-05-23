import React from 'react';
import ReactDOM from 'react-dom';
import IpListItem from '../IpListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IpListItem ip="127.0.1" you={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing when you is true', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IpListItem ip="127.0.1" you={true} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
