const Room = require("../models/roomsModel");
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
    const newRoom = req.body;
    const room = await Room.create(newRoom);
    socket.emit("newRoom");
    res.status(201).json(room);
  } catch (error) {
    handleError(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAllByCenterIds = async (req, res) => {
  try {
    const { ids } = req.query;
    const centerIds = ids.split(",").map((id) => parseInt(id));
    const rooms = await Room.getAllByCenterIds(centerIds);
    res.status(200).json(rooms);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const rooms = await Room.getAll();
    res.status(200).json(rooms);
  } catch (error) {
    handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedRoom = req.body;
    const room = await Room.updateById(req.params.id, updatedRoom);
    res.status(200).json(room);
  } catch (error) {
    handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const room = await Room.delete(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    handleError(res, error);
  }
};
