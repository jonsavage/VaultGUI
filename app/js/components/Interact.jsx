import React from 'react';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

import Mounts from '../components/Mounts';
import SecretReader from '../components/SecretReader';

const styles = {
  content:{
    height: '100%',
    margin: '0 0 0 5px',
    flex: 4
  },
  menu:{
    height: '100%'
  },
  selectedMenuItem: {
    backgroundColor: '#00BCD4', //cyan500
    color: 'white'
  },
  wrapper:{
    display: 'flex',
    flexDirection: 'row wrap',
    width: '100%'
  }
};

export default class Interact extends React.Component {
  state = {
    selectedElement: 0
  };

  handleChange = (event, value) => {
    this.setState({selectedElement: value});
  };

  render = () => {
    let visibleElement = null;

    switch (this.state.selectedElement) {
      case 0:
        visibleElement = <Mounts {...this.props} />;
        break;
      case 1:
        visibleElement = <SecretReader {...this.props} />;
        break;
    }

    return (
      <div style={styles.wrapper}>
        <Paper style={styles.menu}>
          <Menu
            onChange={this.handleChange}
            selectedMenuItemStyle={styles.selectedMenuItem}
            value={this.state.selectedElement}>
            <MenuItem value={0}>Mounts</MenuItem>
            <MenuItem value={1}>Secret Reader</MenuItem>
          </Menu>
        </Paper>
        <div style={styles.content}>
          {visibleElement}
        </div>
      </div>
    );
  };
}
