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
          <p>Future home og Secret Backend searches</p>
        </Tab>
      </Tabs>
    );
  }
}

export default Mounts;
