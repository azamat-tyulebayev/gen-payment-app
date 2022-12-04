import express, { Express, Request, Response } from 'express';
import cors from 'cors';

// Set up an Express server to handle HTTP requests
const app: Express = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(cors({ origin: ['http://localhost:4200'], credentials: true }))

// Store the grid and the bias values in memory
let grid: string[][] = [];
let bias: string = 'Z';
let code: string = '';

// Generate a new grid
function updateGrid(): void {
  let orderedArray: string[] = Array(100);

  if (bias !== '') {
    orderedArray.fill(bias, 0, 20);
    orderedArray.fill('-', 20, 100);
  }

  console.log(bias,orderedArray);

  // Fill the grid with random characters
  for (let i = 0; i < 10; i++) {
    grid[i] = [];
    for (let j = 0; j < 10; j++) {
      const randomCharIndex = Math.floor(Math.random() * orderedArray.length);
      if (bias === orderedArray[randomCharIndex]){
        grid[i][j] = bias;
      } else {
        grid[i][j] = getRandomCharExcludingBias();
      }

      orderedArray.splice(randomCharIndex, 1);
    }
  }
}


// Generate a new code based on the grid and the current time
function updateCode(): void {
  // Get the 2 digit seconds from the system clock
  const d = new Date();

  let seconds = d.getSeconds().toString().padStart(2, '0');

  console.log(seconds);

  const firstDigit = parseInt(seconds[0]);
  const secondDigit = parseInt(seconds[1]);

  console.log(firstDigit, secondDigit);

  // Get the characters at positions [3,6] and [6,3]
  const char1 = grid[firstDigit][secondDigit];
  const char2 = grid[secondDigit][firstDigit];

  // Count the occurrences of the characters in the grid
  let count1 = 0;
  let count2 = 0;
  for (const row of grid) {
    for (const char of row) {
      if (char === char1) count1++;
      if (char === char2) count2++;
    }
  }

  // Exception: If the count is larger than 9, divide it by the lowest
  // integer possible in order to get a value lower or equal to 9
  console.log('count1 count : ', count1);
  console.log('count2 count: ', count2);
  count1 = getLowestInteger(count1);
  count2 = getLowestInteger(count2);
  console.log('count1, count2', count1, count2);
  // Done! That is your code: 79
  code = `${count1}${count2}`;
}

function getLowestInteger(num: number): number {
  if (num > 9) {
    console.log('number greater than 9', num);
    if (isPrime(num)) {
      return 1;
    } else {
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

function isPrime(num: number) {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false; 
  return num > 1;
}

function getRandomCharExcludingBias() {
  let charCode = 65 + Math.floor(Math.random() * 26);
  //todo:make sure is always uppercase.
  if (bias != '' && charCode == bias.charCodeAt(0)) {
    charCode = 65;
  }

  return String.fromCharCode(charCode);
}

// Generate a new grid and code every 2 seconds
setInterval(() => {
   updateGrid();
   updateCode();
}, 2000);

// Handle HTTP GET requests for the grid
app.get('/grid', cors(), (req, res) => {
  //updateGrid();
  res.json({'message': 'Success', 'grid': grid});
});

// Handle HTTP GET requests for the code
app.get('/code',cors(), (req, res) => {
  //updateCode()
  res.send(code);
});

// Handle HTTP POST requests to update the bias values
app.post('/bias', (req, res) => {
  console.log(req.body.biasChar)
  console.log(req.body)

  const char = req.body.biasChar;
  console.log('CHAR!!!', char);
  bias = char;
  res.sendStatus(204);
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
