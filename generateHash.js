console.time("run");
const fs = require('fs');
const STRING_LENGTH_LIMIT = 100;
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
    const DIGITS_LIMIT = 38; //TODO: Make salt a string where each char is randomized 0-9, and length of string is equal to DIGITS_LIMIT
    let seeds = str.split('').map(c => c.charCodeAt(0)).join('');
    let seasons = seeds.length;
    let cycles = Number(seeds[seeds.length - 1]) + 2
    for (let i = 0; i < seasons * cycles; i++) {
        seeds = seeds.split('')
        let fertilizer = (Number(seeds.splice(0, 1)[0]) + 1);
        if (i > seasons) Number(seeds[1]);
        seeds = BigInt(seeds.join(''));
        seeds *= BigInt(fertilizer);
        seeds = seeds.toString();
        if (i > seasons) seeds = seeds.substr(0, DIGITS_LIMIT - 1);
        seeds += fertilizer.toString();
        if (seeds.length < DIGITS_LIMIT) i--;
    }
    return seeds
};
function checkWithinLengthLimit(str){ 
    return str.length <= STRING_LENGTH_LIMIT;
}
async function run() {
    let str;
    if (TEXT_FILE_TO_HASH) {
        str = await getStrFromFile(TEXT_FILE_TO_HASH);

    } else if(PASSED_STRING_TO_HASH) {
        str = PASSED_STRING_TO_HASH;
    } else { 
        console.log("No string given as argument")
        return;
    }
    if (!checkWithinLengthLimit(str)){ 
        console.log(`Length of string exceeded limit of ${STRING_LENGTH_LIMIT}`);
        return;
    }
    let hash = createHashFromString(str);
    console.log(`Hash:${hash} / Original:${str}`)
}
run();
console.timeEnd("run");
//we need entropy, one-way mutations, and salt


