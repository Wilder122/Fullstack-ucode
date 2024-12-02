const heroesData = [
    { name: 'Black Panther', strength: 66, age: 53 },
    { name: 'Captain America', strength: 79, age: 137 },
    { name: 'Captain Marvel', strength: 97, age: 26 },
    { name: 'Hulk', strength: 80, age: 49 },
    { name: 'Iron Man', strength: 88, age: 48 },
    { name: 'Spider-Man', strength: 78, age: 16 },
    { name: 'Thanos', strength: 99, age: 1000 },
    { name: 'Thor', strength: 95, age: 1000 },
    { name: 'Yon-Rogg', strength: 73, age: 52 }
];

let sortingOrder = {
    byName: 'asc',
    byStrength: false,
    byAge: false
};

const notificationDiv = document.getElementById('notification');
notificationDiv.textContent = "Sorting by Name, order: ASC";

function createTable(heroes) {
    const placeholder = document.getElementById("placeholder");
    const table = document.createElement("table");

    table.appendChild(createTableHeader());

    heroes.forEach(hero => {
        const row = document.createElement("tr");
        insertCell(hero.name, row);
        insertCell(hero.strength, row);
        insertCell(hero.age, row);
        table.appendChild(row);
    });

    placeholder.innerHTML = "";
    placeholder.appendChild(table);
}

function insertCell(value, row) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
}

function createTableHeader() {
    const row = document.createElement("tr");
    const headers = ['Name', 'Strength', 'Age'];

    headers.forEach((header, i) => {
        const cell = document.createElement("th");
        cell.textContent = header;

        if (i === 0) {
            cell.addEventListener('click', sortByName);
        } else if (i === 1) {
            cell.addEventListener('click', sortByStrength);
        } else {
            cell.addEventListener('click', sortByAge);
        }

        row.appendChild(cell);
    });

    return row;
}

function sortByName() {
    if (sortingOrder.byName === 'asc') {
        heroesData.sort((a, b) => a.name.localeCompare(b.name));
        sortingOrder.byName = 'desc';
        sortingOrder.byStrength = false;
        sortingOrder.byAge = false;
        notificationDiv.textContent = "Sorting by Name, order: DESC";
    } else {
        heroesData.sort((a, b) => b.name.localeCompare(a.name));
        sortingOrder.byName = 'asc';
        sortingOrder.byStrength = false;
        sortingOrder.byAge = false;
        notificationDiv.textContent = "Sorting by Name, order: ASC";
    }

    createTable(heroesData);
}

function sortByStrength() {
    if (sortingOrder.byStrength === false) {
        heroesData.sort((a, b) => a.strength - b.strength);
        sortingOrder.byName = false;
        sortingOrder.byStrength = true;
        sortingOrder.byAge = false;
        notificationDiv.textContent = "Sorting by Strength, order: ASC";
    } else {
        heroesData.sort((a, b) => b.strength - a.strength);
        sortingOrder.byName = false;
        sortingOrder.byStrength = false;
        sortingOrder.byAge = false;
        notificationDiv.textContent = "Sorting by Strength, order: DESC";
    }

    createTable(heroesData);
}

function sortByAge() {
    if (sortingOrder.byAge === false) {
        heroesData.sort((a, b) => a.age - b.age);
        sortingOrder.byName = false;
        sortingOrder.byStrength = false;
        sortingOrder.byAge = true;
        notificationDiv.textContent = "Sorting by Age, order: ASC";
    } else {
        heroesData.sort((a, b) => b.age - a.age);
        sortingOrder.byName = false;
        sortingOrder.byStrength = false;
        sortingOrder.byAge = false;
        notificationDiv.textContent = "Sorting by Age, order: DESC";
    }

    createTable(heroesData);
}

createTable(heroesData);