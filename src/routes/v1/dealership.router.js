const express = require("express");
const router = express.Router();
const { upload } = require("../../middlewares/multer.middleware.js");

const dealerController = require("../../controllers/dealer.controller.js");

router.post(
  "/",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  dealerController.createDealership
);
router.get("/", dealerController.getAllDealerships);
router.put(
  "/:id",
  upload.fields([
    {
      name: "logo",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  dealerController.updateDealership
);
router.delete('/:id',dealerController.deleteDealership)

module.exports = router;
