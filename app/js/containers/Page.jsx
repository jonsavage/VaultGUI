import React from 'react';
import ReactDOM from 'react-dom';

import Authentication from '../components/Authentication';
import ConnectionForm from '../components/ConnectionForm';
import Mounts from '../components/Mounts';
import NavBar from '../components/NavBar';
import Unseal from '../components/Unseal';

class Page extends React.Component {

  state = {
    vault: null,
    options: null,
    isConnected: false,
    isAuthenticated: false,
    isSealed: null,
    keyCount: null,
    progress: null,
    threshold: null,
    auths: null,
    mounts: null
  };

  initVault = (url) => {
    this.setState({isConnected: true});
    var options = {
      apiVersion: 'v1',
      endpoint: url
    };
    var vault = require("node-vault")(options);

    this.setState({vault: vault}, () => {
      this.refreshStatus();
    });
  };

  refreshStatus = () => {
    this.state.vault.status()
      .then((result) => {
        this.setState(
          {
            isSealed: result.sealed,
            isAuthenticated: this.state.vault.token ? true : false,
            keyCount: result.n,
            progress: result.progress,
            threshold: result.t
        });
    });
  };

  handleConnect = (url) => {
    this.initVault(url);
  };

  handleRootTokenAuthentication = (token) => {
    this.setVaultTokenAndGetStatus(token);
  };

  handleUserPassAuthentication = (username, password) => {
    this.state.vault.userpassLogin({ username, password })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  };

  setVaultTokenAndGetStatus = (token) => {
    var vault = this.state.vault;

    vault.token = token;

    this.setState({vault: vault}, () => {
      this.refreshStatus();
    });
  };

  handleSeal = () => {
    this.state.vault.seal()
      .then( () =>
        this.refreshStatus()
      );
  };

  handleUnseal = (key) => {
    this.state.vault.unseal({key: key})
      .then( () =>
        this.refreshStatus()
      );
  };

  handleGetAuths = () => {
    this.state.vault.auths()
      .then((result) => {
        this.setState({auths: JSON.stringify(result, null, 4)});
      });
  };

  handleGetMounts = () => {
    this.state.vault.mounts()
      .then((result) => {
        this.setState({mounts: JSON.stringify(result, null, 4)});
      });
  };

  render = () => {
    let visibleElement = null;

    if(!this.state.isConnected) {
      visibleElement = (
        <ConnectionForm onSubmit={this.handleConnect}/>
      );
    }
    else if(this.state.isSealed){
      visibleElement = (
        <Unseal
          keyCount={this.state.keyCount}
          progress={this.state.progress}
          threshold={this.state.threshold}
          onSubmit={this.handleUnseal}
        />
      );
    }
    else if(!this.state.isAuthenticated) {
      visibleElement = (
        <Authentication
          rootTokenHandler={this.handleRootTokenAuthentication}
          userPassAutheticationHandler={this.handleUserPassAuthentication}
        />
      );
    } else {
      this.handleGetAuths();
      this.handleGetMounts();
      visibleElement = (
        <Mounts auths={this.state.auths} mounts={this.state.mounts}/>
      );
    }
    return (
      <div>
        <NavBar
          isConnected={this.state.isConnected}
          isAuthenticated={this.state.isAuthenticated}
          isSealed={this.state.isSealed}
          sealHandler={this.handleSeal}
        />
        {visibleElement}
      </div>
    );
  }
}

export default Page
