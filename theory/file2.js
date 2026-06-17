const {a} = require('./file1');
const {b} = require('./file3')

// console.log(a,b)

function addition (value1, value2) {
    return value1 + value2;
}

console.log(addition(a,b));