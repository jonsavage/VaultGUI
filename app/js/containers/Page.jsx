import React from 'react';
import ReactDOM from 'react-dom';

import ConnectionForm from '../components/ConnectionForm';
import NavBar from '../components/NavBar';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vault: null,
      options: null,
      isConnected: false,
      isAuthenticated: false,
      isSealed: null,
      keyCount: null,
      progress: null,
      threshold: null,
      token: null
    };
    this.handleConnect = this.handleConnect.bind(this);
  }

  initVault(url) {
    this.setState({isConnected: true});
    var options = {
      apiVersion: 'v1',
      endpoint: url
    };
    var vault = require("node-vault")(options);

    this.setState({vault: vault}, () => {
      this.refreshStatus();
    });

    console.log(this.state.vault);
  }

  refreshStatus() {
    console.log("refreshStatus");
    console.log(this.state.vault);
    this.state.vault.status()
      .then((result) => {
        console.log("result:");
        console.log(result);
        // this.setState({keyCount: result.n});
        // this.setState({progress: result.progress});
        // this.setState({threshold: result.t});
        this.setState({isSealed: result.sealed});
        this.setState({isAuthenticated: this.state.token ? true : false});
        this.setState({keyCount: result.n});
    });
  }

  handleConnect(url) {
    console.log("url: " + url);
    this.initVault(url);
  }

  render() {
    return (
      <div>
        <NavBar
          isConnected={this.state.isConnected}
          isAuthenticated={this.state.isAuthenticated}
          isSealed={this.state.isSealed}
        />
        <ConnectionForm onSubmit={this.handleConnect}/>
      </div>
    );
  }
}

export default Page
