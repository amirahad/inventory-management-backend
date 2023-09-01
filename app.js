const express = require("express");
const app = express();
const cors = require("cors");
const apiRouters = require("./routes/api.js");


app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.use("/api/v1", apiRouters);


module.exports = app;
