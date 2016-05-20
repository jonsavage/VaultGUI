require("node-vault")

$(function() {

  $("#sealStatus").val(getSealStatus())

  $("#redButton").click(function() {setBackgroundColor("red")} );
  $("#whiteButton").click(function() {setBackgroundColor("white")} );
  $("#blueButton").click(function() {setBackgroundColor("blue")} );
})

function setBackgroundColor(color) {
 document.body.style.backgroundColor = color;
}

function getSealStatus() {
  return "seal status???"
}
