const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const srcFolder = path.join(__dirname, 'files');
const outFolder = path.join(__dirname, 'files-copy');

const copyFolder = async () => {
  try {
    await fsPromises.rm(outFolder, { recursive: true });
  } catch (error) {
    console.log('Error: Folder not found', error.code);
  }
  fs.mkdir(outFolder, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
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
