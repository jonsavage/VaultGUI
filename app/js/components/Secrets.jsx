import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import SecretDeleter from '../components/SecretDeleter';
import SecretsTree from '../components/SecretsTree';
import SecretWriter from '../components/SecretWriter';

export default class Secrets extends React.Component {
  render() {
    return (
      <Tabs>
        <Tab
          label="List">
            <SecretsTree {...this.props}/>
        </Tab>
        <Tab
          label="Write">
            <SecretWriter {...this.props}/>
        </Tab>
        <Tab
          label="Delete">
            <SecretDeleter {...this.props}/>
        </Tab>
      </Tabs>
    );
  }
}
