import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

class Status extends React.Component {

  componentWillMount() {
    this.loadStatus();
  }

  state = {
    status: '',
    mounts: ''
  }

  loadStatus = () => {
    this.props.getStatus()
      .then((result) => {
        this.setState({status: JSON.stringify(result, null, 4)});
      });
  };

  loadHealth = () => {
    this.props.getHealth()
      .then((result) => {
        this.setState({health: JSON.stringify(result, null, 4)});
      });
  };

  render() {
    return (
      <Tabs>
        <Tab
          label="Status"
          onActive={this.loadfStatus} >
            <pre>
              <code>
                {this.state.status}
              </code>
            </pre>
        </Tab>
        <Tab
          label="Health"
          onActive={this.loadHealth}>
          <pre>
            <code>
              {this.state.health}
            </code>
          </pre>
        </Tab>
      </Tabs>
    );
  }
}

export default Status;
