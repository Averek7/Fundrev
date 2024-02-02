const express = require("express");
const cors = require("cors");
const connectToMongo = require("./connection/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

connectToMongo();

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/startups"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port, ${PORT}`);
});
