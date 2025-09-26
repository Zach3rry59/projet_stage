const express = require("express");
const router = express.Router();
const centersController = require("../controllers/centersController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", centersController.getAll);
router.get("/center/:id", centersController.findById);
router.get("/city/:id", centersController.getAllByCityId);
router.post("/center/", verifyUser, isAdmin, centersController.create);
router.put("/center/:id", verifyUser, isAdmin, centersController.update);
router.delete("/center/:id", verifyUser, isAdmin, centersController.delete);

module.exports = router;
