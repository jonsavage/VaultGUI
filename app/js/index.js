import React from 'react';
import ReactDOM from 'react-dom';

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
        <label id="status">{props.isSealed.toString()}</label>
      </li>
    </ul>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
      isAuthenticated: false,
      isSealed: true
    };
  }
  render() {
    return (
      <NavBar
        isConnected={this.state.isConnected}
        isAuthenticated={this.state.isAuthenticated}
        isSealed={this.state.isSealed}
      />
    );
  }
}

ReactDOM.render(
  <Page />,
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
