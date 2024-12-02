import { HardWorker } from './modules/hard-worker.js';

// Example usage
const worker = new HardWorker();
worker.name = 'Bruce';
console.log(worker.name); // Bruce
worker.age = 50;
worker.salary = 1500;
console.log(worker.toObject()); // { name: 'Bruce', age: 50, salary: 1500 }
