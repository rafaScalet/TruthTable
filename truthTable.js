const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function generateTruthTable(proposition, operation) {
    const rows = Math.pow(2, proposition);
    const table = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < proposition; c++) {
            row.push((r & Math.pow(2, c)) ? 1 : 0);
        }
        if (operation === 'AND') {
            const result = row.reduce((acc, val) => acc && val, true);
            row.push(result ? 1 : 0);
        } else if (operation === 'OR') {
            const result = row.reduce((acc, val) => acc || val, false);
            row.push(result ? 1 : 0);
        }
        table.push(row);
    }
    return table;
}

function displayTruthTable(truthTable) {
    console.log(operation == 'AND' ? "tabela verdade conjunção" : "tabela verdade disjunção");
    truthTable.forEach(row => {
        console.log(row.join(' '));
    });
}

const proposition = 2;
const operation = 'OR';
const truthTable = generateTruthTable(proposition, operation);
displayTruthTable(truthTable);