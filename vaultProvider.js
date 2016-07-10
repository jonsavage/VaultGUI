var options = {
  apiVersion: 'v1',
  endpoint: '<address>:<port>',
  token: '1234' // client token; can be fetched after valid initialization of the server
};

var vault = require("node-vault")(options);

function status(onSuccess) {
  var result1 = vault.status(function(err, result) {
    onSuccess(result);
  });
}

exports.status = status;
