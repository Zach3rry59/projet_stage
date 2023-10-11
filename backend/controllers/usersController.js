const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Une erreur s'est produite lors de la récupération des utilisateurs.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;

  User.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  const username = req.params.id;

  User.findOne(username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${username} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la récupération de l'utilisateur avec l'ID ${username}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    is_admin: req.body.is_admin,
  });

  User.create(newUser, (err, data) => {
    if (err) {
      res.send({
        message:
          err.Error ||
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    } else {
      res.send({ Status: "Success", Data: data });
    }
  });
};

exports.updatePass = async (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    res.status(400).send({
      message: "Le contenu de la requête ne peut pas être vide.",
    });
  } else {
    if (req.body.password === "" || req.body.password < 3) {
      res.status(400).send({
        message: "Le mot de passe est trop court.",
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updated = new User({
        password: hashedPassword,
      });
      User.updatePass(id, updated, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Utilisateur avec l'ID ${id} non trouvé.`,
            });
          } else {
            res.status(500).send({
              message: `Erreur lors de la mise à jour de l'utilisateur avec l'ID ${id}.`,
            });
          }
        } else {
          res.send({ data, Status: "OK" });
        }
      });
    }
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.delete(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Utilisateur avec l'ID ${id} non trouvé.`,
        });
      } else {
        res.status(500).send({
          message: `Erreur lors de la suppression de l'utilisateur avec l'ID ${id}.`,
        });
      }
    } else {
      res.send({ message: "Utilisateur supprimé avec succès !" });
    }
  });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Veuillez fournir tous les champs requis." });
    }

    User.findOne(username, async (error, user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      if (error) {
        return res
          .status(500)
          .json({ error: "Une erreur est survenue lors de la connexion." });
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        path: "/",
        sameSite: "strict",
      });
      res
        .status(200)
        .json({ message: "Authentification réussi.", token, role: user.role });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la connexion." });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: "Success" });
};
