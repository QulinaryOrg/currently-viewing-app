import React from 'react';
//eslint-disable-next-line 
//import PropTypes from 'prop-types';
import socketIO from 'socket.io-client';

import Item from './components/Item';

class App extends React.Component {
  
  //eslint-disable-next-line 
  //static defaultProps = {};
  //eslint-disable-next-line 
  //static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };

    this.socket = new socketIO('ws://127.0.0.1:4001');
    this.socket.on('updateList', this.eventUpdateList);
  }

  eventUpdateList = (data)=>{
    this.setState({list: data});
  }

  render() {
    return (
      <ul className='list'>
        {this.state.list.map((ip, index) => (
            <Item key={index} ip={ip}/>
        ))}
      </ul>
    );
  }

}
export default App;
