var options;
var vault;

$(function() {
  $("#connectButton").click(function() {
    connectToServer();
    updateStatus();
  });
  $("#getStatus").click(updateStatus);
  $("#unsealButton").click(unseal);
  $("#setTokenButton").click(setAuthenticationTokenHandler);
  $("#getAuthsMethodsButton").click(getMountedAuthBackends);
  $("#getMountsButton").click(getMountedSecretBackends);
  $("#sealButton").click(seal);
  $("#userpassButton").click(userpassAuthenticate);
  $("#githubButton").click(githubAuthenticate);
  $("#readSecretsButton").click(readSecrets);
});

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

function updateSealStatus(newStatus) {
  $("#status").val(newStatus.sealed);
}

function updateStatus() {
  vault.status()
    .then(function(result) {
      document.getElementById("keyCount").innerHTML = result.n;
      document.getElementById("progress").innerHTML = result.progress;
      document.getElementById("threshold").innerHTML = result.t;
      document.getElementById("status").innerHTML = result.sealed;
      document.getElementById("isConnected").innerHTML = true;
      document.getElementById("isAuthenticated").innerHTML = isAuthenticated();
    });
}

function isAuthenticated() {
  return vault.token !== undefined
}

function seal() {
  vault.seal()
  .then(function() {
    updateStatus();
  });
}

function unseal() {
  var key = $("#key").val();
  unsealVault(key);
  $("#key").val('');
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
    .then(function(result) {
        $("#authMethods").text(Object.keys(result));
    })
    .catch((err) => console.error(err));
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

  vault.userpassLogin({username, password})
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
