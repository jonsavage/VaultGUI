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
    this.handleSeal = this.handleSeal.bind(this);
    this.handleUserPassAuthentication = this.handleUserPassAuthentication.bind(this);
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
    this.setVaultTokenAndGetStatus(token);
  }

  handleUserPassAuthentication(username, password) {
    this.state.vault.userpassLogin({ username, password })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  }

  setVaultTokenAndGetStatus(token) {
    var vault = this.state.vault;

    vault.token = token;

    this.setState({vault: vault}, () => {
      this.refreshStatus();
    });
  }

  handleSeal() {
    this.state.vault.seal()
      .then( () =>
        this.refreshStatus()
      );
  }

  render() {
    return (
      <div>
        <NavBar
          isConnected={this.state.isConnected}
          isAuthenticated={this.state.isAuthenticated}
          isSealed={this.state.isSealed}
          sealHandler={this.handleSeal}
        />
        <ConnectionForm onSubmit={this.handleConnect}/>
        <Authentication
          rootTokenHandler={this.handleRootTokenAuthentication}
          userPassAutheticationHandler={this.handleUserPassAuthentication}
        />
      </div>
    );
  }
}

export default Page
