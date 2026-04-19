const express = require('express');
const path = require('path');

const { spawn } = require('child_process');
const app = express();
const port = 8080;

var distDir = __dirname + '/public/usidiamond.github.io/browser/';
app.use(express.static(distDir));

function getRoot(request, response) {
  response.sendFile(path.resolve(distDir + 'index.html'));
}

app.get('/{*path}', getRoot);

app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`),
);
