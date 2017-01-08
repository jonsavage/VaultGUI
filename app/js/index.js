import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

function NavBar(props) {
  return (
    <ul>
      <li>
        <label for="isConnected">Is Connected:</label>
        <label id="isConnected">{props.isConnected.toString()}</label>
      </li>
      <li>
        <label for="isAuthenticated">Is Authenticated:</label>
        <label id="isAuthenticated">{props.isAuthenticated.toString()}</label>
      </li>
      <li>
        <label for="status">Is Sealed:</label>
        <label id="status">{props.isSealed && props.isSealed.toString()}</label>
      </li>
    </ul>
  );
}

class ConnectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {url: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    this.props.onSubmit(this.state.url);
    event.preventDefault();
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <TextField
            floatingLabelText="Server Url"
            hintText="http://vaultserver.com:8200"
            value={this.state.url}
            onChange={this.handleChange}/>
          <RaisedButton
            type="submit"
            label="Connect"
            primary={true}/>
        </form>
    );
  }
}

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

ReactDOM.render(
  (
  <MuiThemeProvider>
    <Page />
  </MuiThemeProvider>),
  document.getElementById('root')
);

// var options;
// var vault;
//
// var app = angular.module('vaultGui', []);
// app.controller('vaultController', function($scope) {
//   $scope.connectionStatus = false;
//   $scope.authenticationStatus;
//   $scope.sealStatus;
//
//   $scope.connect = function() {
//     connectToServer();
//     updateStatus();
//   }
//
//   $scope.unseal = function() {
//     var key = $("#key").val();
//     unsealVault(key);
//     $("#key").val('');
//   }
//
//   $scope.seal = function() {
//     vault.seal()
//     .then(function() {
//       updateStatus();
//     });
//   }
//
//   $scope.setToken = function() {
//     var token =  $("#token").val();
//     setAuthenticationToken(token);
//     updateStatus();
//   }
//
//   $scope.authenticateUserPass = function() {
//     var username = $("#username").val();
//     var password = $("#password").val();
//
//     vault.userpassLogin({ username, password })
//       .then((result) => setAuthenticationToken(result.auth.client_token))
//       .then(updateStatus);
//   }
//
//   $scope.authenticateGitHub = function() {
//     var token = $("#githubToken").val();
//
//     vault.githubLogin({ token })
//       .then((result) => setAuthenticationToken(result.auth.client_token))
//       .then(updateStatus);
//   }
//
//   $scope.readSecrets = function() {
//     vault.read($("#mountPoint").val())
//       .then((result) => successfulSecretQueryHandler(result.data))
//       .catch((result) => failedSecretQueryHandler(result));
//   }
//
//   $scope.getMountedSecretBackends = function() {
//     vault.mounts()
//       .then((result) => successfulMountsQueryHandler(result))
//       .catch((err) => console.error(err));
//   }
//
//   $scope.getMountedAuthBackends = function() {
//     vault.auths()
//       .then((result) => successfulAuthMountsQueryHandler(result))
//       .catch((err) => console.error(err));
//   }
//
//   function setAuthenticationToken(token) {
//     vault.token = token;
//   }
//
//   function connectToServer() {
//     var serverAddress = $("#serverAddress").val();
//     initVault(serverAddress);
//   }
//
//   function updateStatus() {
//     vault.status()
//       .then(function(result) {
//         document.getElementById("keyCount").innerHTML = result.n;
//         document.getElementById("progress").innerHTML = result.progress;
//         document.getElementById("threshold").innerHTML = result.t;
//         $scope.sealStatus = result.sealed;
//         $scope.connectionStatus = true;
//         $scope.authenticationStatus = isAuthenticated();
//         $scope.$apply();
//       });
//   }
//
//   function isAuthenticated() {
//     return vault.token !== undefined;
//   }
//
//   function unsealVault(unsealKey) {
//     vault.unseal({key:unsealKey})
//       .then(updateStatus);
//   }
//
//   function initVault(serverAddress) {
//     options = {
//       apiVersion: 'v1',
//       endpoint: serverAddress
//     };
//     vault = require("node-vault")(options);
//   }
//
//   function successfulAuthMountsQueryHandler(mountsDictionary) {
//     $("#authBackends").val(JSON.stringify(mountsDictionary, null, 4));
//   }
//
//   function successfulMountsQueryHandler(mountsDictionary) {
//     $("#secretBackends").val(JSON.stringify(mountsDictionary, null, 4));
//   }
//
//   function successfulSecretQueryHandler(secrets) {
//     $("#secrets").val(formatSecrets(secrets));
//   }
//
//   function failedSecretQueryHandler(result) {
//     $("#secrets").text(result);
//   }
//
//   function formatSecrets(secrets) {
//     var output = JSON.stringify(secrets, null, 4);
//     return output;
//   }
// });
