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
    endpoint: serverAddress,
    token: '1234' // client token; can be fetched after valid initialization of the server
  };
  vault = require("node-vault")(options);
}
