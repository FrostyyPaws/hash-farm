const fs = require('fs');
const TEXT_FILE_TO_HASH = "myfakepassword.txt";
function getStrFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};
function createHashFromString(str) {
    let binary = str.split('').map(c => c.charCodeAt(0).toString(2)).join(' ');
    let hash = binary; //placeholder for now while testing and learning
    return hash
};
async function run(){ 
    let str = await getStrFromFile(TEXT_FILE_TO_HASH);
    let hash = createHashFromString(str);
    console.log(`Original:${str}  /  Hash:${hash}`)
}
run();