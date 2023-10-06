const express = require("express");
const router = express.Router();
const centersController = require("../controllers/centersController");

router.get("/all", centersController.getAll);
router.get("/center/:id", centersController.findById);
router.get("/city/:id", centersController.getAllByCityId);
router.post("/center/", centersController.create);
router.put("/center/:id", centersController.update);
router.delete("/center/:id", centersController.delete);

module.exports = router;
