import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

class Mounts extends React.Component {

  render() {
    return (
      <Tabs>
        <Tab label="Secret Backends" >
          <textarea value={this.props.auths}></textarea>
        </Tab>
        <Tab label="Auth Backends" >
          <textarea value={this.props.mounts}></textarea>
        </Tab>
      </Tabs>
    );
  }
}

export default Mounts;
