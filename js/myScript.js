function getInputValues(){
  // get all input from user and validate it
  var input = validateInput();
  if(!input){
    return;
  }
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
  tableColHeaders[1].innerHTML = input.minColVal;
  // populating the top row/column headers
  for(var i = input.minColVal + 1; i <= input.maxColVal; i++) {
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(i);
    newTh.appendChild(textNode);
    trCollection[0].appendChild(newTh);
  }
  //populating each row after the top row
  // this for loop creates a new row element
  // and then the inner for-loop populates the rest of that row 
  for(var j = input.minRowVal; j <= input.maxRowVal; j++) {
    var newTr = document.createElement("tr");
    tbodyElement.appendChild(newTr);
    var lastTr = tbodyElement.lastElementChild;
    var newTh = document.createElement("th");
    var textNode = document.createTextNode(j);
    newTh.appendChild(textNode);
    lastTr.appendChild(newTh);
    for(var x = input.minColVal; x <= input.maxColVal; x++) {
      var newTd = document.createElement("td");
      var textNode = document.createTextNode(x * j);
      newTd.appendChild(textNode);
      lastTr.appendChild(newTd);
    }
  }
}
function validateInput(){
  var minColElement = document.getElementById("minc");
  var minColVal = checkIfInt(document.getElementById("minc").value);
  var maxColElement = document.getElementById("maxc");
  var maxColVal = checkIfInt(document.getElementById("maxc").value);
  var minRowElement = document.getElementById("minr");
  var minRowVal = checkIfInt(document.getElementById("minr").value);
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = checkIfInt(document.getElementById("maxr").value);
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};
  for(let i in input){
    if(input[i][0] == false){
      var errorMsg = document.getElementById("error");
      errorMsg.innerHTML = "You have entered something other than a number";
      input[i][1].style.color = "red";
      return false;
    }
  }
  for(let i in input){
    input[i][1].style.color = "#00F35C";
  }
  
  return {minColVal, maxColVal, minRowVal, maxRowVal};
}
function checkIfInt(inputNum){
  for(let i = 0; i < inputNum.length; i++) {
    if(isNaN(parseInt(inputNum[i]))){
      return false;
    }
  }
  var errorMsg = document.getElementById("error");
  errorMsg.innerHTML = "";
  return parseInt(inputNum);
}
getInputValues();
// When button is clicked, calls the function to populate the table
document.getElementById("button").addEventListener("click", getInputValues);


