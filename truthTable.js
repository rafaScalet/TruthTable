const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function generateTruthTable(proposition, operation) {
  const rows = Math.pow(2, proposition);
  const addTable = document.getElementById("add");
  const table = [];

  for (let r = 0; r < rows; r++) {
    const row = [];

    for (let c = 0; c < proposition; c++) {
      row.push(!(r & Math.pow(2, c)) ? 1 : 0);
    }
    if (operation === "AND") {
      const result = row.reduce((acc, val) => acc && val, true);
      row.push(result ? "V" : "F");
    } else if (operation === "OR") {
      const result = row.reduce((acc, val) => acc || val, false);
      row.push(result ? 1 : 0);
    }
    table.push(row);
  }
  // Create table header
  const tableHead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  alphabet.slice(0, proposition).forEach((variable) => {
    const th = document.createElement("th");
    th.textContent = variable;
    th.setAttribute("scope", "col");
    headerRow.appendChild(th);
  });

  const resultHeader = document.createElement("th");

  resultHeader.textContent = "Result";

  resultHeader.setAttribute("scope", "col");
  headerRow.appendChild(resultHeader);
  tableHead.appendChild(headerRow);

  // Create table body
  const tableBody = document.createElement("tbody");
  table.forEach((row) => {
    const tr = document.createElement("tr");
    row.slice(0, proposition).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    const resultCell = document.createElement("td");
    resultCell.textContent = row[row.length - 1];
    tr.appendChild(resultCell);
    tableBody.appendChild(tr);
  });

  // Clear the table before adding a new one
  addTable.innerHTML = "";
  // Append the head and body to the table
  tableHead.classList.add("table-dark");
  addTable.appendChild(tableHead);
  addTable.appendChild(tableBody);

  return table;
}

function displayTruthTable(truthTable, operation) {
  const headerTruthTable = document.getElementById("header");
  const msg =
    operation === "AND" ? "truth table conjunction" : "truth table disjunction";
  headerTruthTable.textContent = msg;

  truthTable.forEach((row) => {
    console.log(row.join(" "));
  });
}
let proposition = 2; 
function updateProposition() {
  const updatePropositionInput = document.getElementById("change");
  proposition = parseInt(updatePropositionInput.value);
  truthTable = generateTruthTable(proposition, operation);
  displayTruthTable(truthTable, operation);
}

let operation = "AND";
let truthTable = generateTruthTable(proposition, operation);
displayTruthTable(truthTable, operation);

const conjunction = document.getElementById("AND");
conjunction.addEventListener("click", function () {
  disjunction.className = "btn btn-light btn-sm";
  conjunction.className = "btn btn-dark btn-sm";
  operation = "AND";
  truthTable = generateTruthTable(proposition, operation);
  displayTruthTable(truthTable, operation);
});

const disjunction = document.getElementById("OR");
disjunction.addEventListener("click", function () {
  conjunction.className = "btn btn-light btn-sm";
  disjunction.className = "btn btn-dark btn-sm";
  operation = "OR";
  truthTable = generateTruthTable(proposition, operation);
  displayTruthTable(truthTable, operation);
});
