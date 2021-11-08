const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const projectDist = path.join(__dirname, 'project-dist');

async function mergeStyles(src, projectDist) {
  const files = await fsPromises.readdir(src, { withFileTypes: true });
  const styleCss = [];
  const newLine = '\n';

  let filesCss = files.filter(
    (file) =>
      file.isFile() && path.extname(path.join(src, file.name)) === '.css'
  );

  filesCss = filesCss.map((file) =>
    fsPromises.readFile(path.join(src, file.name))
  );

  await Promise.all(filesCss).then((styles) =>
    styles.map((style) => {
      styleCss.push(style);
    })
  );

  fs.writeFile(
    path.join(projectDist, 'style.css'),
    styleCss.join(`${newLine}`),

    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

async function buildPage(projectDist) {
  try {
    await fsPromises.rm(projectDist, { recursive: true });
  } catch (err) {
    console.log(err.code);
  }

  await fsPromises.mkdir(projectDist);

  mergeStyles(path.join(__dirname, 'styles'), projectDist);
}

buildPage(projectDist);
