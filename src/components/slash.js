import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import { socket } from '../actions';

class Slash extends PureComponent {
  componentDidUpdate() {
    console.log(this.props);
  }

  renderConnections() {
    if (this.props.connections) {
      return (
        Object.keys(this.props.connections).map((key) => {
          console.log('key', key);
          return (
            <ListItem button key={key}>
              <ListItemText primary={this.props.connections[key].address} />
            </ListItem>
          );
        })
      );
    }
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <List 
          component="nav"
          subheader={<ListSubheader component="div">Currently Connected IP Addresses</ListSubheader>}
        >
          <ListItem button>
            <ListItemText primary={this.props.welcome} />
          </ListItem>
          {this.renderConnections()}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    welcome: state.application.welcome,
    connections: state.application.connections
  };
};

export default connect(mapStateToProps)(Slash);
