"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)({ origin: ['http://localhost:4200'], credentials: true }));
// Store the grid and the bias values in memory
let grid = [];
let bias = null;
let code = '';
// Generate a new grid
function updateGrid() {
    let orderedArray = Array(100);
    if (bias !== null) {
        orderedArray.fill(bias, 0, 20);
        orderedArray.fill('-', 20, 100);
    }
    console.log(bias, orderedArray);
    // Fill the grid with random characters
    for (let i = 0; i < 10; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
            const randomCharIndex = Math.floor(Math.random() * orderedArray.length);
            if (bias === orderedArray[randomCharIndex]) {
                grid[i][j] = bias;
            }
            else {
                grid[i][j] = getRandomCharExcludingBias();
            }
            orderedArray.splice(randomCharIndex, 1);
        }
    }
}
// Generate a new code based on the grid and the current time
function updateCode() {
    // Get the 2 digit seconds from the system clock
    const d = new Date();
    let seconds = d.getSeconds().toString().padStart(2, '0');
    console.log(seconds);
    const firstDigit = parseInt(seconds[0]);
    const secondDigit = parseInt(seconds[1]);
    console.log(firstDigit, secondDigit);
    const char1 = grid[firstDigit][secondDigit];
    const char2 = grid[secondDigit][firstDigit];
    // Count the occurrences of the characters in the grid
    let count1 = 0;
    let count2 = 0;
    for (const row of grid) {
        for (const char of row) {
            if (char === char1)
                count1++;
            if (char === char2)
                count2++;
        }
    }
    // Exception: If the count is larger than 9, divide it by the lowest
    // integer possible in order to get a value lower or equal to 9
    console.log('count1 count : ', count1);
    console.log('count2 count: ', count2);
    count1 = getLowestInteger(count1);
    count2 = getLowestInteger(count2);
    console.log('count1, count2', count1, count2);
    code = `${count1}${count2}`;
}
function getLowestInteger(num) {
    if (num > 9) {
        console.log('number greater than 9', num);
        if (isPrime(num)) {
            return 1;
        }
        else {
            for (let i = 2; i < num; i++) {
                if (num % i == 0 && num / i <= 9) {
                    return num = num / i;
                }
            }
        }
    }
    console.log('number equal or less than 9', num);
    return num;
}
function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++)
        if (num % i === 0)
            return false;
    return num > 1;
}
function getRandomCharExcludingBias() {
    let charCode = 65 + Math.floor(Math.random() * 26);
    if (bias !== null && charCode == bias.charCodeAt(0)) {
        charCode = 65;
    }
    return String.fromCharCode(charCode);
}
setInterval(() => {
    updateGrid();
    updateCode();
}, 2000);
app.get('/grid', (0, cors_1.default)(), (req, res) => {
    res.json({ 'message': 'Success', 'grid': grid });
});
app.get('/code', (0, cors_1.default)(), (req, res) => {
    res.send(code);
});
app.post('/bias', (req, res) => {
    if (req.body.biasChar !== undefined) {
        const char = req.body.biasChar;
        if (char.length !== 1) {
            return res.sendStatus(400);
        }
        // Check if the request is within the alphabet
        if (false === char.match(/^[A-Za-z]$/)) {
            return res.sendStatus(400);
        }
        console.log('CHAR!!!', char);
        bias = char.toUpperCase();
        return res.sendStatus(204);
    }
    return res.sendStatus(400);
});
// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
