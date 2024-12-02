// guestList - Set
const guestList = new Set();
guestList.add('Alice');
guestList.add('Bob');
guestList.add('Charlie');

console.log(guestList.has('Alice')); // true
console.log(guestList.has('David')); // false

guestList.delete('Bob');
console.log(guestList.has('Bob')); // false

// menu - Map
const menu = new Map();
menu.set('Pizza', 10);
menu.set('Burger', 8);
menu.set('Salad', 7);

for (const [dish, price] of menu.entries()) {
    console.log(`${dish}: $${price}`);
}

// bankVault - WeakMap
const bankVault = new WeakMap();
const credentials = { username: 'Alice', password: '123456' };
bankVault.set(credentials, 'Contents of Box 1');

console.log(bankVault.get(credentials)); // Contents of Box 1

// coinCollection - WeakSet
const coinCollection = new WeakSet();
const coin1 = { denomination: 'Quarter', year: 1998 };
const coin2 = { denomination: 'Dime', year: 2005 };
const coin3 = { denomination: 'Penny', year: 1975 };

coinCollection.add(coin1);
coinCollection.add(coin2);
coinCollection.add(coin3);

console.log(coinCollection.has(coin1)); // true

coinCollection.delete(coin2);
console.log(coinCollection.has(coin2)); // false
