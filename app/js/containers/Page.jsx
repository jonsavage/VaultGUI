import React from 'react';
import ReactDOM from 'react-dom';

import AppBarComposition from '../components/AppBarComposition';
import Authentication from '../components/Authentication';
import ConnectionForm from '../components/ConnectionForm';
import Interact from '../components/Interact';
import Unseal from '../components/Unseal';

class Page extends React.Component {

  state = {
    vaultClient: null,
    options: null,
    isConnected: false,
    isAuthenticated: false,
    isSealed: null,
    keyCount: null,
    progress: null,
    threshold: null
  };

  initVaultClient = (url) => {
    var options = {
      apiVersion: 'v1',
      endpoint: url
    };

    var vaultClient = require("node-vault")(options);

    return vaultClient.status()
      .then(() => {
        this.setState(
          {
            vaultClient: vaultClient,
            isConnected: true
          },
          () => {
            this.refreshStatus();
            resolve();
          });
      })
      .catch(() => reject("Invalid Server"));
  };

  disconnectFromVault = () => {
    this.setState(
      {
        vaultClient: null,
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
    this.state.vaultClient.status()
      .then((result) => {
        this.setState(
          {
            isSealed: result.sealed,
            isAuthenticated: this.state.vaultClient.token ? true : false,
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
    var vaultClient = this.state.vaultClient;
    vaultClient.token = token;

    return vaultClient.tokenLookupSelf()
      .then(() => this.setVaultTokenAndGetStatus(token));
  };

  handleUserPassAuthentication = (username, password) => {
    this.state.vaultClient.userpassLogin({ username, password })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  };

  handleGithubAuthentication = (token) => {
    this.state.vaultClient.githubLogin({ token })
      .then((result) => this.setVaultTokenAndGetStatus(result.auth.client_token));
  };

  handleSignOut = () => {
    this.setVaultTokenAndGetStatus('');
  };

  setVaultTokenAndGetStatus = (token) => {
    var vaultClient = this.state.vaultClient;
    vaultClient.token = token;

    this.setState({vaultClient: vaultClient}, () => {
      this.refreshStatus();
    });
  };

  handleSeal = () => {
    this.state.vaultClient.seal()
      .then( () =>
        this.refreshStatus()
      );
  };

  handleUnseal = (key) => {
    this.state.vaultClient.unseal({key: key})
      .then( () =>
        this.refreshStatus()
      );
  };

  getMounts = () => {
    return this.state.vaultClient.mounts();
  }

  getAuths = () => {
    return this.state.vaultClient.auths();
  }

  getSecrets = (mountPoint) => {
    return this.state.vaultClient.read(mountPoint);
  }

  listSecrets = (path) => {
    return this.state.vaultClient.list(path);
  }

  mountSecretBackend = (path) => {
    return this.state.vaultClient.mount({ mount_point: path, type: 'generic'});
  }

  unmountSecretBackend = (path) => {
    return this.state.vaultClient.unmount({ mount_point: path });
  }

  render = () => {
    let visibleElement = null;

    if(!this.state.isConnected) {
      visibleElement = (
        <ConnectionForm onSubmit={this.initVaultClient}/>
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
            writeSecret={this.state.vaultClient.write}
            deleteSecret={this.state.vaultClient.delete}
            getHealth={this.state.vaultClient.health}
            getStatus={this.state.vaultClient.status}
            getPolicies={this.state.vaultClient.policies}
            tokenLookupSelf={this.state.vaultClient.tokenLookupSelf}
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
