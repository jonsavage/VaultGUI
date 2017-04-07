import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import SecretBackends from './SecretBackends'

export default class Mounts extends React.Component {
  state = {
    auths: ''
  }

  loadAuths = () => {
    this.props.getAuths()
      .then((result) => {
        this.setState({auths: JSON.stringify(result, null, 4)});
      });
  };

  render() {
    return (
      <Tabs>
        <Tab
          label="Secret Backends">
          <SecretBackends {...this.props}/>
        </Tab>
        <Tab
          label="Auth Backends"
          onActive={this.loadAuths}>
          <pre>
            <code>
              {this.state.auths}
            </code>
          </pre>
        </Tab>
      </Tabs>
    );
  }
}
