const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function generateTruthTable(proposition, operation) {
  const rows = Math.pow(2, proposition);
  const addTable = document.getElementById("add");
  const table = [];

  for (let r = 0; r < rows; r++) {
    const row = [];

    for (let c = 0; c < proposition; c++) {
      row.push(r & Math.pow(2, c) ? 1 : 0);
    }
    if (operation === "AND") {
      const result = row.reduce((acc, val) => acc && val, true);
      row.push(result ? 1 : 0);
    } else if (operation === "OR") {
      const result = row.reduce((acc, val) => acc || val, false);
      row.push(result ? 1 : 0);
    }
    table.push(row);
  }

  // Create table header
  const headerRow = document.createElement("tr");
  alphabet.slice(0, proposition).forEach((variable) => {
    const th = document.createElement("th");
    th.textContent = variable;
    headerRow.appendChild(th);
  });

  const resultHeader = document.createElement("th");
  resultHeader.textContent = "Result";
  headerRow.appendChild(resultHeader);
  addTable.innerHTML = ""; // Limpa a tabela antes de adicionar uma nova

  addTable.appendChild(headerRow);

  table.forEach((row) => {
    const tr = document.createElement("tr");
    row.slice(0, proposition).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    const resultCell = document.createElement("td");
    resultCell.textContent = row[row.length - 1]; // Último valor é o resultado
    tr.appendChild(resultCell);
    addTable.appendChild(tr);
  });

  return table;
}

function displayTruthTable(truthTable, operation) {
  const headerTruthTable = document.getElementById("header");
  const msg = operation === "AND" ? "tabela verdade conjunção" : "tabela verdade disjunção";
  headerTruthTable.textContent = msg;

  truthTable.forEach((row) => {
    console.log(row.join(" "));
  });
}
let proposition = 2;
function updateProposition() {
    const updatePropositionInput = document.getElementById('change');
    proposition = parseInt(updatePropositionInput.value);
    truthTable = generateTruthTable(proposition, operation); 
    displayTruthTable(truthTable, operation);
}

let operation = "AND";
let truthTable = generateTruthTable(proposition, operation);
displayTruthTable(truthTable, operation);

const conjunction = document.getElementById("AND");
conjunction.addEventListener("click", function() {
  operation = "AND";
  truthTable = generateTruthTable(proposition, operation); 
  displayTruthTable(truthTable, operation); 
});

const disjunction = document.getElementById("OR");
disjunction.addEventListener("click", function() {
  operation = "OR";
  truthTable = generateTruthTable(proposition, operation); 
  displayTruthTable(truthTable, operation);
});