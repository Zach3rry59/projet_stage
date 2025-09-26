const express = require("express");
const router = express.Router();
const keysController = require("../controllers/keysController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", keysController.getAll);
router.get("/key/:id", keysController.findById);
router.get("/center/:id", keysController.getAllByCenterId);
router.post("/key/", verifyUser, isAdmin, keysController.create);
router.put("/key/:id", verifyUser, isAdmin, keysController.update);
router.delete("/key/:id", verifyUser, isAdmin, keysController.delete);

module.exports = router;
