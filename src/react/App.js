import React from 'react';

class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <h1>Currently Viewing App</h1>
        <p>Welcome to my app</p>
        <ul>
          <li>
            <span className="label">IP:</span>
            <span className="ip">127.0.0.1</span>
          </li>
          <li>
            <span className="label">IP:</span>
            <span className="ip">128.0.0.1</span>
          </li>
          <li>
            <span className="label">
              IP <span>(You)</span>:
            </span>
            <span className="ip">123.202.404.10</span>
          </li>
          <li>
            <span className="label">IP:</span>
            <span className="ip">129.0.0.1</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
