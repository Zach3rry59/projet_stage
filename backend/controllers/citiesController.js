const City = require("../models/citiesModel");
const socket = require("../socket");

const handleError = (res, error) => {
  console.error(error);
  if (error.kind === "not_found") {
    return res.status(404).json({ error: "Ville non trouvée." });
  }
  return res.status(500).json({ error: "Une erreur est survenue." });
};

exports.create = async (req, res) => {
  try {
    const newCity = req.body;
    newCity.modified_at = new Date();
    console.log(newCity);
    const city = await City.create(newCity);
    socket.emit("newCity");
    res.status(201).json(city);
  } catch (error) {
    handleError(res, error);
  }
};

exports.findById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    res.status(200).json(city);
  } catch (error) {
    handleError(res, error);
  }
};

exports.getAll = async (req, res) => {
  try {
    const cities = await City.getAll();
    res.status(200).json(cities);
  } catch (error) {
    handleError(res, error);
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCity = req.body;
    const city = await City.updateById(req.params.id, updatedCity);
    res.status(200).json(city);
  } catch (error) {
    handleError(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    const city = await City.delete(req.params.id);
    res.status(200).json(city);
  } catch (error) {
    handleError(res, error);
  }
};
