const fs = require('fs');
const TEXT_FILE_TO_HASH = "";
const PASSED_STRING_TO_HASH = process.argv[2];
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
    let repeatCycles = Number(seed[seed.length - 1]) + 2
    for (let i = 0; i < cycles * repeatCycles; i++) {
        seed = seed.split('')
        let fertilizer = (Number(seed.splice(0, 1)[0]) + 1);
        seed = BigInt(seed.join(''));
        seed *= BigInt(fertilizer);
        seed = seed.toString();
        if (i > cycles) {
            seed = seed.substr(0, DIGITS_LIMIT - 1);
        }
        seed += fertilizer.toString();
        if (seed.length < DIGITS_LIMIT) i--;

    }
    return seed
};
async function run() {
    let str;
    if (TEXT_FILE_TO_HASH) {
        str = await getStrFromFile(TEXT_FILE_TO_HASH);
    } else {
        str = PASSED_STRING_TO_HASH;
    }
    let hash = createHashFromString(str);
    console.log(`Hash:${hash} / Original:${str}`)
}
run();
//we need entropy, one-way mutations, and salt


