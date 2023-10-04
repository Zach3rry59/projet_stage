const sql = require("../db/db");

const City = {};

City.create = (newCity) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO city SET ?";
    sql.query(query, newCity, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: res.insertId, ...newCity });
    });
  });
};

City.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM city WHERE id = ?";
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

City.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM city";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

City.updateById = (id, updatedCity) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE city SET ? WHERE id = ?";
    sql.query(query, [updatedCity, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ id, ...updatedCity });
    });
  });
};

City.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM city WHERE id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ message: "La ville a été supprimée avec succès!" });
    });
  });
};

module.exports = City;
