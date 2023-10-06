const express = require("express");
const router = express.Router();
const keysController = require("../controllers/keysController");

router.get("/all", keysController.getAll);
router.get("/key/:id", keysController.findById);
router.get("/center/:id", keysController.getAllByCenterId);
router.post("/key/", keysController.create);
router.put("/key/:id", keysController.update);
router.delete("/key/:id", keysController.delete);

module.exports = router;
