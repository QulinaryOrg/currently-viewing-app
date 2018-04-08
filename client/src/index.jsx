import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            Hello World!
            </div>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));