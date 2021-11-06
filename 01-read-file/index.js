const fs = require('fs');
const path = require('path');

const fileContent = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8'
);

fileContent.on('data', (fileContent) => {
  console.log(fileContent);
});
