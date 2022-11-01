function getInputValues(){
  // get all input from browser and parse into an int data type
  var minCol = parseInt(document.getElementById("minc").value);
  var maxCol = parseInt(document.getElementById("maxc").value);
  var minRow = parseInt(document.getElementById("minr").value);
  var maxRow = parseInt(document.getElementById("maxr").value);
  // remove previous table
  var table = document.getElementById("table");
  table.remove();
  // creates new HTML table
  // structure: div -> table -> tbody -> tr -> th th 
  var tableParentDiv = document.getElementById("coltable");
  var newTable = document.createElement("table");
  newTable.id = "table";
  tableParentDiv.appendChild(newTable);
  var newTbody = document.createElement("tbody");
  newTable.appendChild(newTbody);
  var newTr = document.createElement("tr");
  newTbody.appendChild(newTr);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  // initialize elements and populate first column header
  var tbodyElement = document.getElementById("table").firstElementChild;
  var trCollection = tbodyElement.children;
  var tableColHeaders = trCollection[0].children;
  tableColHeaders[1].innerHTML = minCol;
  // populating the top row/column headers
  for(var i = minCol + 1; i <= maxCol; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
  //populating each row after the top row
  // this for loop creates a new row element
  // and then the inner for-loop populates the rest of that row 
  for(var j = minRow; j <= maxRow; j++) {
    var newTr = document.createElement("tr");
    tbodyElement.appendChild(newTr);
    var lastTr = tbodyElement.lastElementChild;
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(j);
    newTh.appendChild(textNode);
    lastTr.appendChild(newTh);
    for(var x = minCol; x <= maxCol; x++) {
      var newTd = document.createElement("td");
      var textNode = document.createTextNode(x * j);
      newTd.appendChild(textNode);
      lastTr.appendChild(newTd);
    }
  }
}
getInputValues();
// When button is clicked, calls the function to populate the table
document.getElementById("button").addEventListener("click", getInputValues);
