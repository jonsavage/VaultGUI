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
            <pre>
              <code>
                {this.state.mounts}
              </code>
            </pre>
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

export default Mounts;
