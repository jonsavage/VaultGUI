import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import SecretLister from '../components/SecretLister';
import SecretReader from '../components/SecretReader';
import SecretDeleter from '../components/SecretDeleter';
import SecretWriter from '../components/SecretWriter';

class Secrets extends React.Component {
  render() {
    return (
      <Tabs>
        <Tab
          label="List">
            <SecretLister {...this.props}/>
        </Tab>
        <Tab
          label="Read">
            <SecretReader {...this.props}/>
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

export default Secrets;
