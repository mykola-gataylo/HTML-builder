const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const outFolder = path.join(__dirname, 'files-copy');

const copyFolder = () => {
  fs.mkdir(outFolder, () => {
    fs.readdir(srcFolder, (err, files) => {
      files.map((file) => {
        fs.copyFile(
          path.join(srcFolder, file),
          path.join(outFolder, file),

          (err) => {
            if (err) {
              throw err;
            }
          }
        );
      });
    });
  });
};

copyFolder();
