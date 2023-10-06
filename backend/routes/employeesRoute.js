const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");

router.get("/all", employeesController.getAll);
router.get("/employee/:id", employeesController.findById);
router.post("/employee/", employeesController.create);
router.put("/employee/:id", employeesController.update);
router.delete("/employee/:id", employeesController.delete);

module.exports = router;
