require("dotenv").config();
const fs = require("fs");
const https = require("https");
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, "utf8");
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH, "utf8");
const sshCredentials = { key: privateKey, cert: certificate };
const express = require("express");
const app = express();
const port = process.env.port || 3000;
const sshPort = process.env.SSH_PORT || 3001;

const routes = require("./routes/chords");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

const httpsServer = https.createServer(sshCredentials, app);

httpsServer.listen(sshPort);
// app.listen(port);
console.log("server started on", port);
