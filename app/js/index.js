var options;
var vault;

$(function() {
  $("#connectButton").click(function() {
    var serverAddress = $("#serverAddress").val();
    initVault(serverAddress);

    updateStatus();
  });

  $("#getStatus").click(updateStatus);

  $("#unsealButton").click(function() {
    var key = $("#key").val();
    unseal(key);
    $("#key").val('');
  });

  $("#setTokenButton").click(function() {
    vault.token =  $("#token").val();
  })

  $("#getAuthsMethodsButton").click(getMountedAuthBackends);
});

function updateSealStatus(newStatus) {
  $("#status").val(newStatus.sealed);
}

function updateStatus() {
  vault.status()
    .then(function(result) {
      $("#keyCount").val(result.n);
      $("#progress").val(result.progress);
      $("#threshold").val(result.t);
      $("#status").val(result.sealed);
    });
}

function unseal(unsealKey) {
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
