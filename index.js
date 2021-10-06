const fs = require('fs');
const TEXT_FILE_TO_HASH = "myfakepassword.txt";
function getStrFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(TEXT_FILE_TO_HASH, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};
function createHashFromString(str) {
    
};
