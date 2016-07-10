var vaultProvider = require("./vaultProvider.js")

$(function() {
  updateStatus();

  $("#getStatus").click(function() {
    vaultProvider.status(function(result) {
      updateSealStatus(result);
    });
  });
});

function updateSealStatus(newStatus) {
  $("#status").val(newStatus.sealed);
}

function updateStatus(newStatus) {
  vaultProvider.status(function(result) {
    $("#keyCount").val(result.n);
    $("#threshold").val(result.t);
    $("#status").val(result.sealed);
  });
}
