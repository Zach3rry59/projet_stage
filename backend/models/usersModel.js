const sql = require("../db/db");
const bcrypt = require("bcrypt");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.role = user.role;
};

User.getAll = (result) => {
  sql.query("SELECT id, username, password, role FROM user", (err, res) => {
    if (err) {
      console.log("Erreur :", err);
      result(null, err);
      return;
    }

    console.log("Utilisateurs :", res);
    result(null, res);
  });
};

User.findOne = (username, result) => {
  sql.query(
    "SELECT id, username, password, role FROM user WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res[0]);
    }
  );
};

User.findById = (id, result) => {
  sql.query(
    "SELECT id, username, password, role FROM user WHERE id = ?",
    [id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length === 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res[0]);
    }
  );
};

User.create = (newUser, result) => {
  bcrypt.hash(newUser.password.toString(), 10, (err, hash) => {
    if (err) {
      result({ Error: "Error during hashing" }, null);
      return;
    }
    if (newUser.password === "") {
      result({ Error: "Error : Password must not be empty" }, null);
      return;
    }
    if (newUser.password < 3) {
      result({ Error: "Error : Password must be 3 or more character" }, null);
      return;
    }
    if (newUser.username.length < 3) {
      result({ Error: "Error : Username must be more than 3 character" }, null);
      return;
    }
    newUser.password = hash;
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("Error :", err);
        result(err, null);
        return;
      }

      console.log("User created :", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  });
};

User.update = (id, newUser, result) => {
  sql.query(
    "UPDATE user SET password = ?, role = ? WHERE id = ?",
    [newUser.password, newUser.role, id],
    (err, res) => {
      if (err) {
        console.log("Error :", err);
        result(err, null);
        return;
      }

      console.log("Utilisateur mise à jour :", {
        id: res.insertId,
        ...newUser,
      });
      result(null, { id: res.insertId, ...newUser });
    }
  );
};

User.delete = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Erreur :", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Utilisateur supprimé avec ID :", id);
    result(null, res);
  });
};

module.exports = User;
