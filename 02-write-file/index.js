const readline = require('readline');

const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const greetingMsg = 'Hello! Type your text!';
const goodbyeMsg = 'Goodbye!';
const newLine = '\n';

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    rl.close();
  } else {
    fs.appendFile(
      path.join(__dirname, 'text.txt'),
      `${input}${newLine}`,

      (err) => {
        if (err) {
          throw err;
        }
      }
    );
  }
})

  .on('sigint', () => {
    rl.close();
  })

  .on('close', () => {
    console.log(`${goodbyeMsg}`);
  });

fs.open(path.join(__dirname, 'text.txt'), 'w', (err) => {
  if (err) {
    throw err;
  }
});

console.log(`${greetingMsg}`);
