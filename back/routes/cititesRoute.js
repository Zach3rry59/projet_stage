const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/citiesController");

router.get("/all", citiesController.getAll);
router.get("/city/:id", citiesController.findById);
router.post("/city/", citiesController.create);
router.put("/city/:id", citiesController.update);
router.delete("/city/:id", citiesController.delete);

module.exports = router;
