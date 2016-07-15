var options = {
  apiVersion: 'v1',
  endpoint: '<addresss>:<port>',
  token: '1234' // client token; can be fetched after valid initialization of the server
};

var vault = require("node-vault")(options);

$(function() {
  updateStatus();
  $("#getStatus").click(updateStatus);
});

function updateSealStatus(newStatus) {
  $("#status").val(newStatus.sealed);
}

function updateStatus() {
  vault.status()
    .then(function(result) {
      $("#keyCount").val(result.n);
      $("#threshold").val(result.t);
      $("#status").val(result.sealed);
    });
}
