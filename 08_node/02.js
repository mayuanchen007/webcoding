const fs = require('fs');
fs.readFile("1.txt", 'ut5f-8', function(err, data) {
    if (err) {
        console.log(err.message);
    } else {
        console.log(data);
    }
})