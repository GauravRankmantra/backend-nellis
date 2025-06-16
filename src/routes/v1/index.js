const express = require('express')
const router = express.Router();
const dealerRouter = require("./dealership.router.js");

router.use("/dealerships", dealerRouter);

module.exports = router;
