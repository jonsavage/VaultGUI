import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui/Tabs';

import RootTokenAuthentication from './RootTokenAuthentication';
import UserPassAuthentication from './UserPassAuthentication';

class Authentication extends React.Component {

  render() {
    return (
      <Tabs>
        <Tab label="Root Token" >
          <RootTokenAuthentication onSubmit={this.props.rootTokenHandler}/>
        </Tab>
        <Tab label="Username/Password" >
          <UserPassAuthentication onSubmit={this.props.userPassAutheticationHandler}/>
        </Tab>
      </Tabs>
    );
  }
}

export default Authentication;
