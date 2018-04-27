import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import CssBaseline from 'material-ui/CssBaseline';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

class Slash extends PureComponent {
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
          <ListItem button>
            <ListItemText primary="127.0.0.1" />
          </ListItem>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    welcome: state.application.welcome
  }
};

export default connect(mapStateToProps)(Slash);
