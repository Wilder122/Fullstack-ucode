var Number = 42;
var BigInt = 1234567890123456789012345678901234567890n;
var String = 'Hello, JavaScript!';
var Boolean = true;
var nullVar = null;
var Undefined;
var Object = { key: 'value' };
var Symbol = Symbol('mySymbol');
var Function = function() { console.log('Hello, function!'); };


var output = '';
output += 'Number is ' + typeof Number + '\n';
output += 'BigInt is ' + typeof BigInt + '\n';
output += 'String is ' + typeof String + '\n';
output += 'Boolean is ' + typeof Boolean + '\n';
output += 'Null is ' + (nullVar === null ? 'null' : typeof nullVar) + '\n';
output += 'Undefined is ' + typeof Undefined + '\n';
output += 'Object is ' + typeof Object + '\n';
output += 'Symbol is ' + typeof Symbol + '\n';
output += 'Function is ' + typeof Function + '\n';

alert(output);
