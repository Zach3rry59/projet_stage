const sql = require("../db/db");

const Room = {};

Room.create = (newRoom) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO room SET ?";
    sql.query(query, newRoom, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: res.insertId, ...newRoom });
    });
  });
};

Room.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM room WHERE id = ?";
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

Room.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM room";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

Room.getAllByCenterIds = (ids) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM room WHERE id_center IN (?)";
    sql.query(query, [ids], (err, res) => {
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

Room.updateById = (id, updatedRoom) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE room SET ? WHERE id = ?";
    sql.query(query, [updatedRoom, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ id, ...updatedRoom });
    });
  });
};

Room.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM room WHERE id = ?";
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

module.exports = Room;
