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
    const DIGITS_LIMIT = 38;
    let seed = str.split('').map(c => c.charCodeAt(0)).join('');
    let cycles = seed.length;
    let repeatCycles = Number(seed[length-1]) + 2
    console.log(cycles); 
    console.log(seed);
    for (let i = 0; i < cycles * repeatCycles; i++) {
        seed = seed.split('')
        let fertilizer = (Number(seed.splice(0,1)[0])+1);
        seed = BigInt(seed.join(''));
        seed *= BigInt(fertilizer);
        seed = seed.toString();
        if (i>cycles){ 
            seed = seed.substr(0,DIGITS_LIMIT-1);
        }
        seed += fertilizer.toString();
        if (seed.length < DIGITS_LIMIT) i--;

    }
    console.log(seed);
    return seed
};
async function run() {
    let str = await getStrFromFile(TEXT_FILE_TO_HASH);
    let hash = createHashFromString(str);
    //console.log(`Original:${str}  /  Hash:${hash}`)
}
run();
//we need entropy, one-way mutations, and salt


