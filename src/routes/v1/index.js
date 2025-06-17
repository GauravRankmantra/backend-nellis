const express = require("express");
const router = express.Router();
const dealerRouter = require("./dealership.router.js");
const weeklySpclRouter = require("./weeklySpcl.router.js");
const vehicleRouter=require("./vehicle.router.js")
const specialOfferRouter = require("./specialOffer.router.js")
const businessOfferRouter = require("./business.Router.js")


router.use("/dealerships", dealerRouter);
router.use("/weekly-specials", weeklySpclRouter);
router.use("/vehicles", vehicleRouter);
router.use("/special-offers",specialOfferRouter)
router.use("/businesses",businessOfferRouter)

module.exports = router;
