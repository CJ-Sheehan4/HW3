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
  var newThead = document.createElement("thead");
  var newTbody = document.createElement("tbody");
  newTable.appendChild(newThead);
  newTable.appendChild(newTbody);
  var newTr = document.createElement("tr");
  newThead.appendChild(newTr);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  var newTh = document.createElement("th");
  newTr.appendChild(newTh);
  // adding to tbody
  // var newTr = document.createElement("tr");
  // newTbody.appendChild(newTr);
  // var newTh = document.createElement("th");
  // newTr.appendChild(newTh);
  // var newTh = document.createElement("th");
  // newTr.appendChild(newTh);
  // initialize elements and populate first column header
  var tHeadtBodyPair = document.getElementById("table").children;
  var tHead = tHeadtBodyPair[0];
  var trCollection = tHead.children;
  console.log(trCollection);
  var tableColHeaders = trCollection[0].children;
  console.log(tableColHeaders);
  tableColHeaders[1].innerHTML = input.minColVal;
  console.log(tableColHeaders[1]);
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
    tHeadtBodyPair[1].appendChild(newTr);
    var lastTr = tHeadtBodyPair[1].lastElementChild;
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
// this function validates all the input: ensures only numbers entered, min isnt larger than max, etc.
function validateInput(){
  var minColElement = document.getElementById("minc");
  var minColVal = checkIfInt(document.getElementById("minc").value);
  var maxColElement = document.getElementById("maxc");
  var maxColVal = checkIfInt(document.getElementById("maxc").value);
  var minRowElement = document.getElementById("minr");
  var minRowVal = checkIfInt(document.getElementById("minr").value);
  var maxRowElement = document.getElementById("maxr");
  var maxRowVal = checkIfInt(document.getElementById("maxr").value);
  var errorMsg = document.getElementById("error");
  var input = {minCol: [minColVal, minColElement], 
              maxCol: [maxColVal, maxColElement],
              minRow: [minRowVal, minRowElement],
              maxRow: [maxRowVal, maxRowElement]};
  for(let i in input){ // if one of the values returned false, then it outputs the message and returns false
    if(input[i][0] === false){
      errorMsg.innerHTML = "You have entered something other than a number";
      input[i][1].style.color = "red";
      return false;
    }
    if(input[i][0] > 50 || input[i][0] < -50){
      errorMsg.innerHTML = "The value you entered is out of range: -50 <= value <= 50";
      input[i][1].style.color = "red";
      return false;
    }
  }
  if(minColVal > maxColVal){
    errorMsg.innerHTML = "minimum column cannot be larger than the maximum column";
    input.minCol[1].style.color = "red";
    input.maxCol[1].style.color = "red";
    return false;
  }
  if(minRowVal > maxRowVal){
    errorMsg.innerHTML = "minimum row cannot be larger than the maximum row";
    input.minRow[1].style.color = "red";
    input.maxRow[1].style.color = "red";
    return false;
  }
  // if it didnt return false, reset all the colors back to normal so they arent all red
  for(let i in input){ 
    input[i][1].style.color = "#00F35C";
  }
  return {minColVal, maxColVal, minRowVal, maxRowVal};
}
function checkIfInt(inputNum){
  var temp = "";
  if(inputNum[0] == '-'){
    for(let j = 1; j < (inputNum.length); j++){
      temp += inputNum[j];
    }
    temp = checkIfInt(temp);
    if(!temp){
      return false;
    }
    else{
      inputNum = temp - temp - temp;
    }
  }
  for(let i = 0; i < inputNum.length; i++) {
    if(isNaN(parseInt(inputNum[i]))){
      return false;
    }
  }
  var errorMsg = document.getElementById("error");
  errorMsg.innerHTML = "";
  return parseInt(inputNum);
}

/*main*/ 
getInputValues();
// When button is clicked, calls the function to populate the table
document.getElementById("button").addEventListener("click", getInputValues);


