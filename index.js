const express = require("express");
const app = express();
const port = process.env.port || 3000;

const routes = require("./routes/chords");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);
console.log("server started on", port);
