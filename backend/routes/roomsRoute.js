const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");

router.get("/all", roomsController.getAll);
router.get("/room/:id", roomsController.findById);
router.get("/center/:id", roomsController.getAllByCenterId);
router.post("/room/", roomsController.create);
router.put("/room/:id", roomsController.update);
router.delete("/room/:id", roomsController.delete);

module.exports = router;
