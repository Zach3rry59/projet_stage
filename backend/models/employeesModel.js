const sql = require("../db/db");

const Employee = {};

Employee.create = (newEmployee) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO employee SET ?";
    sql.query(query, newEmployee, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id: res.insertId, ...newEmployee });
    });
  });
};

Employee.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM employee WHERE id = ?";
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

Employee.getAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM employee";
    sql.query(query, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

Employee.updateById = (id, updatedEmployee) => {
  return new Promise((resolve, reject) => {
    const query = "UPDATE employee SET ? WHERE id = ?";
    sql.query(query, [updatedEmployee, id], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ id, ...updatedEmployee });
    });
  });
};

Employee.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM employee WHERE id = ?";
    sql.query(query, id, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res.affectedRows === 0) {
        reject({ kind: "not_found" });
        return;
      }
      resolve({ message: "L'employé a été supprimée avec succès!" });
    });
  });
};

module.exports = Employee;
