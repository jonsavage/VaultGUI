import React from 'react';
import ReactDOM from 'react-dom';

import AppBarComposition from '../components/AppBarComposition';
import Authentication from '../components/Authentication';
import ConnectionForm from '../components/ConnectionForm';
import Interact from '../components/Interact';
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

  getMounts = () => {
    return this.state.vault.mounts();
  }

  getAuths = () => {
    return this.state.vault.auths();
  }

  getSecrets = (mountPoint) => {
    return this.state.vault.read(mountPoint);
  }

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
      visibleElement = (
        <div>
          <Interact
            getAuths={this.getAuths}
            getMounts={this.getMounts}
            getSecrets={this.getSecrets}/>
        </div>
      );
    }
    return (
      <div>
        <AppBarComposition
          isConnected={this.state.isConnected}
          isAuthenticated={this.state.isAuthenticated}
          isSealed={this.state.isSealed}
          handleSeal={this.handleSeal}
        />
        {visibleElement}
      </div>
    );
  }
}

export default Page
