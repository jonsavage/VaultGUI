import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import RootTokenAuthentication from './RootTokenAuthentication';

class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs>
        <Tab label="Root Token" >
          <RootTokenAuthentication onSubmit={this.props.rootTokenHandler}/>
        </Tab>
      </Tabs>
    );
  }
}

export default Authentication;
