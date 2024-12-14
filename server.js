const express = require("express");
const path = require("path");

const { spawn } = require("child_process");
const app = express();
const port = 8080;

var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500,
});
app.use(limiter);


var bodyParser = require("body-parser");
app.use(bodyParser.json());

var distDir = __dirname + "/public/usidiamond.github.io/browser/";
app.use(express.static(distDir));

function getRoot(request, response) {
  response.sendFile(path.resolve(distDir + "index.html"));
}

app.get("/", getRoot);

app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
