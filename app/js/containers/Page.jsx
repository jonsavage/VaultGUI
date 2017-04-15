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
    threshold: null
  };

  initVault = (url) => {
    return new Promise((resolve, reject) => {
      var options = {
        apiVersion: 'v1',
        endpoint: url
      };

      var vault = require("node-vault")(options);

      vault.status()
        .then(() => {
          this.setState(
            {
              vault: vault,
              isConnected: true
            },
            () => {
              this.refreshStatus();
              resolve();
            });
        })
        .catch(() => reject("Invalid Server"));
    });
  };

  disconnectFromVault = () => {
    this.setState(
      {
        vault: null,
        options: null,
        isConnected: false,
        isAuthenticated: false,
        isSealed: null,
        keyCount: null,
        progress: null,
        threshold: null
      },
      () => {
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
    })
    .catch((err) => {
      console.log(err);
    });
  };

  handleRootTokenAuthentication = (token) => {
    var vault = this.state.vault;
    vault.token = token;

    return vault.tokenLookupSelf()
      .then(() => this.setVaultTokenAndGetStatus(token));
  };

  handleUserPassAuthentication = (username, password) => {
    this.state.vault.userpassLogin({ username, password })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  };

  handleGithubAuthentication = (token) => {
    this.state.vault.githubLogin({ token })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  };

  handleSignOut = () => {
    this.setVaultTokenAndGetStatus('');
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

  listSecrets = (path) => {
    return this.state.vault.list(path);
  }

  mountSecretBackend = (path) => {
    return this.state.vault.mount({ mount_point: path, type: 'generic'});
  }

  unmountSecretBackend = (path) => {
    return this.state.vault.unmount({ mount_point: path });
  }

  render = () => {
    let visibleElement = null;

    if(!this.state.isConnected) {
      visibleElement = (
        <ConnectionForm onSubmit={this.initVault}/>
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
          githubAuthenticationHandler={this.handleGithubAuthentication}
        />
      );
    } else {
      visibleElement = (
        <div>
          <Interact
            getAuths={this.getAuths}
            getMounts={this.getMounts}
            getSecrets={this.getSecrets}
            listSecrets={this.listSecrets}
            mountSecretBackend={this.mountSecretBackend}
            writeSecret={this.state.vault.write}
            deleteSecret={this.state.vault.delete}
            getHealth={this.state.vault.health}
            getStatus={this.state.vault.status}
            getPolicies={this.state.vault.policies}
            tokenLookupSelf={this.state.vault.tokenLookupSelf}
            unmountSecretBackend={this.unmountSecretBackend}
          />
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
          handleSignOut={this.handleSignOut}
          handleDisconnect={this.disconnectFromVault}
        />
        {visibleElement}
      </div>
    );
  }
}

export default Page
