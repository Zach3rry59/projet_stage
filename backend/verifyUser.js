const jwt = require("jsonwebtoken");

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

const isAdmin = (req, res, next) => {
  if (req.role === 1) {
    next();
  } else {
    res.status(403).json({ error: "Access forbidden for non-admin users" });
  }
};

module.exports = {
  verifyUser,
  isAdmin,
};
