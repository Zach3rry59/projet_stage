const Center = require("../models/centersModel");
const socket = require("../socket");
const handleError = (res, error) => {
  console.error(error);
  if (error.kind === "not_found") {
    return res.status(404).json({ error: "Centre non trouvée." });
  }
  if (error.kind === "not_found_city") {
    return res
      .status(404)
      .json({ error: "Aucun centre trouvée dans cette ville." });
  }
  return res.status(500).json({ error: "Une erreur est survenue." });
};

exports.create = async (req, res) => {
  try {
    const newCenter = req.body;
    const center = await Center.create(newCenter);
    socket.emit("newCenter");
    res.status(201).json(center);
  } catch (error) {
    handleError(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id);
    res.status(200).json(center);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAllByCityId = async (req, res) => {
  try {
    const centers = await Center.getAllByCityId(req.params.id);
    res.status(200).json(centers);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const centers = await Center.getAll();
    res.status(200).json(centers);
  } catch (error) {
    handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCenter = req.body;
    const center = await Center.updateById(req.params.id, updatedCenter);
    res.status(200).json(center);
  } catch (error) {
    handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const center = await Center.delete(req.params.id);
    res.status(200).json(center);
  } catch (error) {
    handleError(res, error);
  }
};
