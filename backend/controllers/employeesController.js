const Employee = require("../models/employeesModel");
const socket = require("../socket");

const handleError = (res, error) => {
  console.error(error);
  if (error.kind === "not_found") {
    return res.status(404).json({ error: "Employé non trouvée." });
  }
  return res.status(500).json({ error: "Une erreur est survenue." });
};

exports.create = async (req, res) => {
  try {
    const newEmployee = req.body;
    const employee = await Employee.create(newEmployee);
    socket.emit("newEmployee");
    res.status(201).json(employee);
  } catch (error) {
    handleError(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const cemployees = await Employee.getAll();
    res.status(200).json(cemployees);
  } catch (error) {
    handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedEmployee = req.body;
    const employee = await Employee.updateById(req.params.id, updatedEmployee);
    socket.emit("newEmployee");
    res.status(200).json(employee);
  } catch (error) {
    handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const employee = await Employee.delete(req.params.id);
    socket.emit("newEmployee");
    res.status(200).json(employee);
  } catch (error) {
    handleError(res, error);
  }
};
