const express = require("express");
const mongoose = require("mongoose");
const createRoutes = require("./routes/createRoutes");
const getRoutes = require("./routes/getRoutes");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

const mongoDB =
  "mongodb+srv://sagarmongodb:9937170872@cluster0.hh7px.mongodb.net/books?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// app.use("/api", );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", createRoutes);
app.use("/api", getRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
