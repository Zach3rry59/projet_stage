const express = require("express");
const router = express.Router();
const employeesController = require("../controllers/employeesController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", employeesController.getAll);
router.get("/employee/:id", employeesController.findById);
router.post("/employee/", verifyUser, isAdmin, employeesController.create);
router.put("/employee/:id", verifyUser, isAdmin, employeesController.update);
router.delete("/employee/:id", verifyUser, isAdmin, employeesController.delete);

module.exports = router;
