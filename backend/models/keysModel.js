const sql = require("../db/db");

const Key = {};

Key.create = (newKey) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO `key` SET ?";
    sql.query(query, newKey, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: res.insertId, ...newKey });
    });
  });
};

Key.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `key` WHERE id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res[0]);
      } else {
        reject({ kind: "not_found" });
      }
    });
  });
};

Key.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `key`";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

Key.getAllByCenterId = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM `key` WHERE id_center = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res);
      } else {
        reject({ kind: "not_found_center" });
      }
    });
  });
};

Key.updateById = (id, updatedKey) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE `key` SET ? WHERE id = ?";
    sql.query(query, [updatedKey, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ id, ...updatedKey });
    });
  });
};

Key.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM `key` WHERE id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ message: "La salle a été supprimée avec succès!" });
    });
  });
};

module.exports = Key;
