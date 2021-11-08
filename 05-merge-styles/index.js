const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const srcFolder = path.join(__dirname, 'styles');
const outFolder = path.join(__dirname, 'project-dist');
const bundleCss = [];
const newLine = '\n';

const build = async (folder) => {
  const files = await fsPromises.readdir(folder, { withFileTypes: true });

  let filesCss = files.filter(
    (file) =>
      file.isFile() && path.extname(path.join(folder, file.name)) === '.css'
  );

  filesCss = filesCss.map((file) =>
    fsPromises.readFile(path.join(folder, file.name))
  );

  await Promise.all(filesCss).then((styles) =>
    styles.map((style) => {
      bundleCss.push(style);
    })
  );

  fs.writeFile(
    path.join(outFolder, 'bundle.css'),
    bundleCss.join(`${newLine}`),

    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

build(srcFolder);
