const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const { verifyUser, isAdmin } = require("../verifyUser");

router.get("/all", verifyUser, isAdmin, userController.getAll);
router.get("/user/:id", userController.findOne);
router.post("/user/", verifyUser, isAdmin, userController.create);
router.delete("/user/:id", verifyUser, isAdmin, userController.delete);
router.get("/logout", userController.logout);
router.post("/login", userController.login);
router.put("/user/:id", verifyUser, isAdmin, userController.update);

router.get("/", verifyUser, (req, res) => {
  return res.json({
    username: req.username,
    id: req.id,
    role: req.role,
  });
});

module.exports = router;
