const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./src/db/index.js");
const errorHandler = require('./src/middlewares/errorHandler.middleware.js');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiRoutes = require("./src/routes/index.js");
app.use("/api", apiRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);
