import React, { Component } from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://10.8.65.62:4001",
      items: []
   
    };
    this.socket = socketIOClient(this.state.endpoint);
    this.socket.on('connect', () => {
      console.log('connected');
    })

  }
  componentDidMount() {
    this.socket.on('receiveIp', (ip) => this.setState({items: [...this.state.items, ip]}));
  }



  render() {
   

   
    return (
      <div style={{ textAlign: "center"}}>


        
        <div className="items">{this.state.items.map((item, index) => { return <li key={index} style={{ color: "blue"}}>{item}</li>; })}</div>
    

      </div>
    )
  }
}
export default App;