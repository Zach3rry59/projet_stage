const sql = require("../db/db");

const Center = {};

Center.create = (center) => {
  const newCenter = {
    name: center.name,
    adress: center.adress,
    id_city: center.id_city,
    phone: center.phone,
  };
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO center SET ?";
    sql.query(query, newCenter, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: res.insertId, ...newCenter });
    });
  });
};

Center.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM center WHERE id = ?";
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

Center.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM center";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

Center.getAllByCityId = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM center WHERE id_city = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.length) {
        resolve(res);
      } else {
        reject({ kind: "not_found_city" });
      }
    });
  });
};

Center.updateById = (id, updatedCenter) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE center SET ? WHERE id = ?";
    sql.query(query, [updatedCenter, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ id, ...updatedCenter });
    });
  });
};

Center.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM center WHERE id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ message: "Le centre a été supprimée avec succès!" });
    });
  });
};

module.exports = Center;
