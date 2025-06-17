const express = require("express");
const router = express.Router();
const { upload } = require("../../middlewares/multer.middleware.js");

const dealerController = require("../../controllers/dealer.controller.js");

router.get("/", dealerController.getAllDealerships);
router.get("/search", dealerController.searchDealerships);
router.get("/searchIdName",dealerController.getDealershipNamesAndIds)

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
router.delete("/:id", dealerController.deleteDealership);

module.exports = router;
