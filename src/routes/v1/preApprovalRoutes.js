const express = require("express");
const router  = express.Router();
const ctrl    = require("../../controllers/preApprovalController.js");

// Public routes
router.post("/", ctrl.createPreApproval);

// Admin / protected routes
router.get("/",        ctrl.getAllPreApprovals);
router.get("/count",   ctrl.totalPreApprovals);
router.get("/:id",     ctrl.getPreApproval);
router.put("/:id",     ctrl.updatePreApproval);
router.delete("/:id",  ctrl.deletePreApproval);

module.exports = router;
