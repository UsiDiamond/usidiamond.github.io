const express = require('express');
const path = require('path');

const { spawn } = require('child_process');
const app = express();
const port = 8080;

var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 500,
});
app.use(limiter);

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
