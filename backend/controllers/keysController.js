const Key = require("../models/keysModel");
const socket = require("../socket");

const handleError = (res, error) => {
  console.error(error);
  if (error.kind === "not_found") {
    return res.status(404).json({ error: "Salle non trouvée." });
  }
  if (error.kind === "not_found_center") {
    return res
      .status(404)
      .json({ error: "Aucune salle trouvée dans ce centre." });
  }
  return res.status(500).json({ error: "Une erreur est survenue." });
};

exports.create = async (req, res) => {
  try {
    const newKey = req.body;
    const key = await Key.create(newKey);
    socket.emit("newKey");
    res.status(201).json(key);
  } catch (error) {
    handleError(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);
    res.status(200).json(key);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAllByCenterId = async (req, res) => {
  try {
    const keys = await Key.getAllByCenterId(req.params.id);
    res.status(200).json(keys);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const keys = await Key.getAll();
    res.status(200).json(keys);
  } catch (error) {
    handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedKey = req.body;
    const key = await Key.updateById(req.params.id, updatedKey);
    socket.emit("newKey");
    res.status(200).json(key);
  } catch (error) {
    handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const key = await Key.delete(req.params.id);
    socket.emit("newKey");
    res.status(200).json(key);
  } catch (error) {
    handleError(res, error);
  }
};
