console.time("run");
const fs = require('fs');
const STRING_LENGTH_LIMIT = 20;
const TEXT_FILE_TO_HASH = "";
const PASSED_STRING_TO_HASH = process.argv[2];
const SALT_TO_USE = process.argv[3];
function getStrFromFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};
function createSalt(digits) {
    if (SALT_TO_USE) return SALT_TO_USE;
    let salt = "";
    for (let i = 0; i < digits; i++) {
        salt += Math.round(Math.random() * 9).toString();
    }
    return salt.split('').map(e => Number(e));
}
function stringify(input){ 
    if (Array.isArray(input)){ 
        input = input.join('')
    } else { 
        input.toString();
    }
    return input
}
function plantFarm(seeds,salt){ 
    seeds = stringify(seeds);
    salt = stringify(salt);
    return seeds + salt;
}
function createHashFromString(str) {
    const DIGITS_LIMIT = 38;
    let salt = createSalt(DIGITS_LIMIT);
    let seeds = str.split('').map(c => c.charCodeAt(0)).join('');
    let farm = plantFarm(seeds,salt);
    let plots = farm.length;
    let cycles = 100;
    for (let i = 0; i < plots * cycles; i++) {
        farm = farm.split('');
        let fertilizer = (Number(farm.splice(0, 1)[0]) + 1);
        farm = BigInt(farm.join(''));
        farm *= BigInt(fertilizer);
        farm = farm.toString();
        farm += fertilizer.toString();
    }
    farm = farm.substr(0, DIGITS_LIMIT);
    console.log(`Salt:${salt.join('')}`)
    return farm
};
function isWithinLengthLimit(str) {
    return str.length <= STRING_LENGTH_LIMIT;
}
async function run() {
    let str;
    if (PASSED_STRING_TO_HASH) {
        str = PASSED_STRING_TO_HASH;
    } else if (TEXT_FILE_TO_HASH) {
        str = await getStrFromFile(TEXT_FILE_TO_HASH);
    } else {
        console.log("No string given as argument")
        return;
    }
    if (!isWithinLengthLimit(str)) {
        console.log(`Length of string exceeded limit of ${STRING_LENGTH_LIMIT}`);
        return;
    }
    let hash = createHashFromString(str);
    console.log(`Hash:${hash} / Original:${str}`)
}
run();
console.timeEnd("run");
//we need entropy, one-way mutations, and salt


