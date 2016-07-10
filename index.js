var vaultProvider = require("./vaultProvider.js")

$(function() {
  updateStatus();

  $("#unseal").click(function() {
    var key = keyBox.val();
    var result = vaultProvider.unseal(key);

    var statusResult = vaultProvider.status();

    updateSealStatus(statusResult);
  });

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
