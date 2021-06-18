'use strict';

const fs = require('fs');

let student = {
    name: 'Mike',
    age: 23,
    gender: 'Male',
    department: 'English',
    car: 'Honda'
};

let data = JSON.stringify(student, null, 2);

fs.writeFile('https://jsonplaceholder.typicode.com/posts', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

console.log('This is after the write call');
