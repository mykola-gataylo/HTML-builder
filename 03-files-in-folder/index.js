const fs = require('fs');
const path = require('path');

const secretFolder = path.join(__dirname, 'secret-folder');
const byte = 0.000977;

fs.readdir(secretFolder, (err, files) => {
  files.forEach((file) => {
    const filePath = path.join(secretFolder, file);

    fs.stat(filePath, (err, stats) => {
      if (stats.isFile()) {
        const extName = path.extname(filePath);
        const baseName = path.basename(filePath, extName);
        const kB = (stats.size * byte).toFixed(2);

        console.log(`${baseName} - ${extName.slice(1)} - ${kB}kB`);
      }
    });
  });
});
