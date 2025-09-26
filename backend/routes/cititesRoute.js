const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/citiesController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", citiesController.getAll);
router.get("/city/:id", citiesController.findById);
router.post("/city/", verifyUser, isAdmin, citiesController.create);
router.put("/city/:id", verifyUser, isAdmin, citiesController.update);
router.delete("/city/:id", verifyUser, isAdmin, citiesController.delete);

module.exports = router;
