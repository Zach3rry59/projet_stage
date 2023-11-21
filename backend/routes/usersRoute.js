const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const jwt = require("jsonwebtoken");

router.get("/all", userController.getAll);
router.get("/user/:id", userController.findOne);
router.post("/user/", userController.create);
router.delete("/user/:id", userController.delete);
router.get("/logout", userController.logout);
router.post("/login", userController.login);
router.put("/user/:id", userController.update);

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ Error: "Unauthorized" });
      }
      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).json({ Error: "Unauthorized" });
        }
        const newAccessToken = jwt.sign(
          {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        res.cookie("token", newAccessToken, {
          httpOnly: true,
          maxAge: 3600000,
          path: "/",
          sameSite: "strict",
        });
        next();
      });
    } else {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        const refreshToken = jwt.sign(
          {
            id: decoded.id,
            username: decoded.username,
            role: decoded.role,
          },
          process.env.JWT_SECRET
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
        });
      }
      req.id = decoded.id;
      req.username = decoded.username;
      req.role = decoded.role;
      next();
    }
  });
};

router.get("/", verifyUser, (req, res) => {
  return res.json({
    username: req.username,
    id: req.id,
    role: req.role,
  });
});

module.exports = router;
