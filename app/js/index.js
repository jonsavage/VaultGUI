var options;
var vault;

var app = angular.module('vaultGui', []);
app.controller('vaultController', function($scope) {
  $scope.connectionStatus = false;
  $scope.authenticationStatus;
  $scope.sealStatus;

  $(function() {
    $("#getStatus").click(updateStatus);
    $("#setTokenButton").click(setAuthenticationTokenHandler);
    $("#getAuthMountsButton").click(getMountedAuthBackends);
    $("#getMountsButton").click(getMountedSecretBackends);
    $("#userpassButton").click(userpassAuthenticate);
    $("#githubButton").click(githubAuthenticate);
    $("#readSecretsButton").click(readSecrets);
  });

  $scope.connect = function() {
    connectToServer();
    updateStatus();
  }

  $scope.unseal = function() {
    var key = $("#key").val();
    unsealVault(key);
    $("#key").val('');
  }

  $scope.seal = function() {
    vault.seal()
    .then(function() {
      updateStatus();
    });
  }

  function setAuthenticationTokenHandler() {
    var token =  $("#token").val();
    setAuthenticationToken(token);
    updateStatus();
  }

  function setAuthenticationToken(token) {
    vault.token = token;
  }

  function connectToServer() {
    var serverAddress = $("#serverAddress").val();
    initVault(serverAddress);
  }

  function updateStatus() {
    vault.status()
      .then(function(result) {
        document.getElementById("keyCount").innerHTML = result.n;
        document.getElementById("progress").innerHTML = result.progress;
        document.getElementById("threshold").innerHTML = result.t;
        $scope.sealStatus = result.sealed;
        $scope.connectionStatus = true;
        $scope.authenticationStatus = isAuthenticated();
        $scope.$apply();
      });
  }

  function isAuthenticated() {
    return vault.token !== undefined;
  }

  function unsealVault(unsealKey) {
    vault.unseal({key:unsealKey})
      .then(updateStatus);
  }

  function initVault(serverAddress) {
    options = {
      apiVersion: 'v1',
      endpoint: serverAddress
    };
    vault = require("node-vault")(options);
  }

  function getMountedAuthBackends() {
    vault.auths()
      .then((result) => successfulAuthMountsQueryHandler(result))
      .catch((err) => console.error(err));
  }

  function successfulAuthMountsQueryHandler(mountsDictionary) {
    $("#authBackends").val(JSON.stringify(mountsDictionary, null, 4));
  }

  function getMountedSecretBackends() {
    vault.mounts()
      .then((result) => successfulMountsQueryHandler(result))
      .catch((err) => console.error(err));
  }

  function successfulMountsQueryHandler(mountsDictionary) {
    $("#secretBackends").val(JSON.stringify(mountsDictionary, null, 4));
  }

  function userpassAuthenticate() {
    var username = $("#username").val();
    var password = $("#password").val();

    vault.userpassLogin({ username, password })
      .then((result) => setAuthenticationToken(result.auth.client_token))
      .then(updateStatus);
  }

  function githubAuthenticate() {
    var token = $("#githubToken").val();

    vault.githubLogin({ token })
      .then((result) => setAuthenticationToken(result.auth.client_token))
      .then(updateStatus);
  }

  function readSecrets() {
    vault.read($("#mountPoint").val())
      .then((result) => successfulSecretQueryHandler(result.data))
      .catch((result) => failedSecretQueryHandler(result));
  }

  function successfulSecretQueryHandler(secrets) {
    $("#secrets").val(formatSecrets(secrets));
  }

  function failedSecretQueryHandler(result) {
    $("#secrets").text(result);
  }

  function formatSecrets(secrets) {
    var output = JSON.stringify(secrets, null, 4);
    return output;
  }
});
