import React from 'react';
import ReactDOM from 'react-dom';

import Authentication from '../components/Authentication';
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
      threshold: null
    };
    this.handleConnect = this.handleConnect.bind(this);
    this.handleRootTokenAuthentication = this.handleRootTokenAuthentication.bind(this);
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
  }

  refreshStatus() {
    this.state.vault.status()
      .then((result) => {
        this.setState({isSealed: result.sealed});
        this.setState({isAuthenticated: this.state.vault.token ? true : false});
        this.setState({keyCount: result.n});
    });
  }

  handleConnect(url) {
    this.initVault(url);
  }

  handleRootTokenAuthentication(token) {
    var vault = this.state.vault;

    vault.token = token;

    this.setState({vault: vault}, () => {
      this.refreshStatus();
    });
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
        <Authentication rootTokenHandler={this.handleRootTokenAuthentication}/>
      </div>
    );
  }
}

export default Page
