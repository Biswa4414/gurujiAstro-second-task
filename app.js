const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flowRoutes = require("./router/flowRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.use(bodyParser.json());

app.use("/api/flows", flowRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
