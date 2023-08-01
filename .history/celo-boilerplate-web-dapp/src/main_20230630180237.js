$(document).ready(function() {
  // Tree information array
  var treeInfoArray = [
    { species: "Tree 1", age: 10, location: "Location 1", proofOfPlant: "Proof 1", proofOfLife: "Proof 1" },
    { species: "Tree 2", age: 20, location: "Location 2", proofOfPlant: "Proof 2", proofOfLife: "Proof 2" },
    { species: "Tree 3", age: 30, location: "Location 3", proofOfPlant: "Proof 3", proofOfLife: "Proof 3" },
    { species: "Tree 4", age: 40, location: "Location 4", proofOfPlant: "Proof 4", proofOfLife: "Proof 4" },
    { species: "Tree 5", age: 50, location: "Location 5", proofOfPlant: "Proof 5", proofOfLife: "Proof 5" }
  ];

  // Populate tree information table
  var treeTableBody = $("#treeInfoTableBody");
  for (var i = 0; i < treeInfoArray.length; i++) {
    var treeInfo = treeInfoArray[i];
    var treeRow = "<tr>" +
                  "<td>" + treeInfo.species + "</td>" +
                  "<td>" + treeInfo.age + "</td>" +
                  "<td>" + treeInfo.location + "</td>" +
                  "<td>" + treeInfo.proofOfPlant + "</td>" +
                  "<td>" + treeInfo.proofOfLife + "</td>" +
                  "</tr>";
    treeTableBody.append(treeRow);
  }

  // Handle form submission (Mint button click)
  $("#mintForm").submit(function(event) {
    event.preventDefault();

    // Read form values
    var species = $("#species").val();
    var age = $("#age").val();
    var location = $("#location").val();
    var proofOfPlant = $("#proofOfPlant").val();
    var proofOfLife = $("#proofOfLife").val();

    // Create a new tree row with the form values
    var newTreeRow = "<tr>" +
                     "<td>" + species + "</td>" +
                     "<td>" + age + "</td>" +
                     "<td>" + location + "</td>" +
                     "<td>" + proofOfPlant + "</td>" +
                     "<td>" + proofOfLife + "</td>" +
                     "</tr>";

    // Append the new tree row to the table body
    treeTableBody.append(newTreeRow);

    // Reset form values
    $("#species").val("");
    $("#age").val("");
    $("#location").val("");
    $("#proofOfPlant").val("");
    $("#proofOfLife").val("");
  });
});