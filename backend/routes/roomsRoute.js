const express = require("express");
const router = express.Router();
const roomsController = require("../controllers/roomsController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", roomsController.getAll);
router.get("/room/:id", roomsController.findById);
router.get("/centers", roomsController.getAllByCenterIds);
router.post("/room/", verifyUser, isAdmin, roomsController.create);
router.put("/room/:id", verifyUser, isAdmin, roomsController.update);
router.delete("/room/:id", verifyUser, isAdmin, roomsController.delete);

module.exports = router;
