import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

class Mounts extends React.Component {

  componentWillMount() {
    this.loadMounts();
  }

  state = {
    auths: '',
    mounts: ''
  }

  loadAuths = () => {
    this.props.getAuths()
      .then((result) => {
        this.setState({auths: JSON.stringify(result, null, 4)});
      });
  };

  loadMounts = () => {
    this.props.getMounts()
      .then((result) => {
        this.setState({mounts: JSON.stringify(result, null, 4)});
      });
  };

  render() {
    return (
      <Tabs>
        <Tab
          label="Secret Backends"
          onActive={this.loadMounts} >
            <textarea value={this.state.mounts}></textarea>
        </Tab>
        <Tab
          label="Auth Backends"
          onActive={this.loadAuths}>
            <textarea value={this.state.auths}></textarea>
        </Tab>
      </Tabs>
    );
  }
}

export default Mounts;
